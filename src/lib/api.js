import { supabase } from './supabase';

// --- COMPANY ---
export const fetchCompany = async () => {
  const { data, error } = await supabase.from('company_details').select('*').single();
  if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
    console.error('Error fetching company:', error);
  }
  return data;
};

export const saveCompany = async (company) => {
  // Ensure singleton ID is 1
  const payload = { ...company, id: 1 };
  const { data, error } = await supabase.from('company_details').upsert(payload).select().single();
  if (error) throw error;
  return data;
};

// --- CUSTOMERS ---
export const fetchCustomers = async () => {
  const { data, error } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const addCustomer = async (customer) => {
  const { data, error } = await supabase.from('customers').insert(customer).select().single();
  if (error) throw error;
  return data;
};

export const updateCustomer = async (customer) => {
  const { data, error } = await supabase.from('customers').update(customer).eq('id', customer.id).select().single();
  if (error) throw error;
  return data;
};

export const deleteCustomer = async (id) => {
  const { error } = await supabase.from('customers').delete().eq('id', id);
  if (error) throw error;
  return true;
};

// --- PRODUCTS ---
export const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const addProduct = async (product) => {
  const { data, error } = await supabase.from('products').insert(product).select().single();
  if (error) throw error;
  return data;
};

export const updateProduct = async (product) => {
  const { data, error } = await supabase.from('products').update(product).eq('id', product.id).select().single();
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  return true;
};

// --- INVOICES ---
export const fetchInvoices = async () => {
  // Fetch invoices along with their items
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      items:invoice_items(*)
    `)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const addInvoice = async (invoice) => {
  // Separate items from invoice payload
  const { items, ...invoiceData } = invoice;
  
  // 1. Insert Invoice
  const { data: savedInvoice, error: invError } = await supabase
    .from('invoices')
    .insert(invoiceData)
    .select()
    .single();
    
  if (invError) throw invError;
  
  // 2. Insert Items
  if (items && items.length > 0) {
    const itemsPayload = items.map(item => ({
      invoice_id: savedInvoice.id,
      productName: item.productName,
      hsnSac: item.hsnSac,
      qty: item.qty,
      rate: item.rate,
      gstRate: item.gstRate
    }));
    
    const { error: itemsError } = await supabase.from('invoice_items').insert(itemsPayload);
    if (itemsError) {
      console.error('Error saving invoice items:', itemsError);
      // Depending on strictness, we might want to delete the invoice if items fail, or just throw
      throw itemsError;
    }
  }
  
  // Return complete object by fetching it again or manually constructing it
  return { ...savedInvoice, items };
};

export const deleteInvoice = async (id) => {
  // Due to ON DELETE CASCADE on invoice_items, deleting invoice deletes items automatically
  const { error } = await supabase.from('invoices').delete().eq('id', id);
  if (error) throw error;
  return true;
};

// Used for backup/restore purposes
export const wipeDatabase = async () => {
  await supabase.from('invoice_items').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
  await supabase.from('invoices').delete().neq('id', 'dummy');
  await supabase.from('customers').delete().neq('id', 'dummy');
  await supabase.from('products').delete().neq('id', 'dummy');
  await supabase.from('company_details').delete().neq('id', 0);
  return true;
};
