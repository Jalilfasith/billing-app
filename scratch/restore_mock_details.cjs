const fs = require('fs');

const mockDataPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/data/mockData.js';
const createInvoicePath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx';
const appPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/App.jsx';

const normalize = (str) => str.replace(/\r\n/g, '\n');
const denormalize = (str) => str.replace(/\n/g, '\r\n');

// 1. Restore mockData.js
if (fs.existsSync(mockDataPath)) {
  const originalMockData = 'export const initialCompanyDetails = {\n' +
    '  name: "THE UNIT OF JAMIL GROUPS",\n' +
    '  legalName: "JAFFAN BANU JAFFER ALI",\n' +
    '  subtitle: "A Unit of Jamil Groups",\n' +
    '  gstin: "33ASLPJ0181C1Z7",\n' +
    '  phone: "+91 98765 43210",\n' +
    '  email: "contact@jamilgroups.com",\n' +
    '  website: "www.jamilgroups.com",\n' +
    '  address: "NO-56B, WEST NEEM STREET, ASHOKA TREE STREET, GANDHI NAGAR POST, KURINJIPADI TK, Neyveli, Cuddalore, Tamil Nadu - 607308",\n' +
    '  bankName: "State Bank of India",\n' +
    '  bankBranch: "NEYVELI",\n' +
    '  bankAccountNo: "39876543210",\n' +
    '  bankIfsc: "SBIN0001234",\n' +
    '  accountName: "JAFFAN BANU JAFFER ALI",\n' +
    '  upiId: "jamilgroups@sbi",\n' +
    '  terms: "Goods once sold will not be taken back or exchanged",\n' +
    '  logoUrl: "/jamil_logo.png",\n' +
    '  signatureUrl: "/jamil_signature.jpg",\n' +
    '  qrCodeUrl: "/qr_code.png",\n' +
    '  signatureText: "For THE UNIT OF JAMIL GROUPS"\n' +
    '};\n\n' +
    'export const initialCustomers = [\n' +
    '  {\n' +
    '    id: "cust-1",\n' +
    '    name: "JEHIS ONLINE MARKETING",\n' +
    '    address: "4-306H/10, CMC Nagar (opp. CMC School), Thammathukonam, Nagercoil, Kanniyakumari, Tamil Nadu, 629004",\n' +
    '    shippingAddress: "4-306H/10, CMC Nagar (opp. CMC School), Thammathukonam, Nagercoil, Kanniyakumari, Tamil Nadu, 629004",\n' +
    '    phone: "9442551622",\n' +
    '    gstin: "33BPPJ1074G1ZR",\n' +
    '    pan: "BBPPJ1074G",\n' +
    '    placeOfSupply: "Tamil Nadu"\n' +
    '  },\n' +
    '  {\n' +
    '    id: "cust-2",\n' +
    '    name: "ORGANIC GLOW COSMETICS",\n' +
    '    address: "12/4B, Main Road, Kovilpatti, Thoothukudi, Tamil Nadu, 628501",\n' +
    '    shippingAddress: "12/4B, Main Road, Kovilpatti, Thoothukudi, Tamil Nadu, 628501",\n' +
    '    phone: "9876543210",\n' +
    '    gstin: "33AABCX1234F1Z0",\n' +
    '    pan: "AABCX1234F",\n' +
    '    placeOfSupply: "Tamil Nadu"\n' +
    '  }\n' +
    '];\n\n' +
    'export const initialProducts = [\n' +
    '  {\n' +
    '    id: "prod-1",\n' +
    '    name: "Day cream 50gms",\n' +
    '    unitPrice: 200,\n' +
    '    gstRate: 18,\n' +
    '    hsnSac: "33049910"\n' +
    '  },\n' +
    '  {\n' +
    '    id: "prod-2",\n' +
    '    name: "Face cream 30gm",\n' +
    '    unitPrice: 450,\n' +
    '    gstRate: 18,\n' +
    '    hsnSac: "33049910"\n' +
    '  },\n' +
    '  {\n' +
    '    id: "prod-3",\n' +
    '    name: "Hair oil 100ml",\n' +
    '    unitPrice: 250,\n' +
    '    gstRate: 18,\n' +
    '    hsnSac: "33059011"\n' +
    '  }\n' +
    '];\n\n' +
    'export const initialInvoices = [\n' +
    '  {\n' +
    '    id: "inv-1",\n' +
    '    invoiceNo: "JM 01",\n' +
    '    invoiceDate: "2026-07-04",\n' +
    '    dueDate: "2026-07-11",\n' +
    '    customerId: "cust-1",\n' +
    '    items: [\n' +
    '      { productName: "Day cream 50gms", hsnSac: "33049910", qty: 25, rate: 200, gstRate: 18 },\n' +
    '      { productName: "Face cream 30gm", hsnSac: "33049910", qty: 50, rate: 450, gstRate: 18 },\n' +
    '      { productName: "Hair oil 100ml", hsnSac: "33059011", qty: 30, rate: 250, gstRate: 18 }\n' +
    '    ],\n' +
    '    terms: "Goods once sold will not be taken back or exchanged",\n' +
    '    receivedAmount: 0,\n' +
    '    notes: "Thank you for your business!"\n' +
    '  }\n' +
    '];\n';

  fs.writeFileSync(mockDataPath, denormalize(originalMockData), 'utf8');
  console.log('Successfully restored mockData.js details');
}

// 2. Restore CreateInvoice.jsx Dates, Terms, and default line items
if (fs.existsSync(createInvoicePath)) {
  let content = fs.readFileSync(createInvoicePath, 'utf8');
  content = normalize(content);

  // Restore invoiceNo
  content = content.replace(
    '  const [invoiceNo, setInvoiceNo] = useState("");',
    '  const [invoiceNo, setInvoiceNo] = useState(() => {\n' +
    '    const count = invoices.length;\n' +
    '    return `JM ${String(count + 1).padStart(2, \'0\')}`;\n' +
    '  });'
  );

  // Restore invoiceDate
  content = content.replace(
    '  const [invoiceDate, setInvoiceDate] = useState("");',
    '  const [invoiceDate, setInvoiceDate] = useState(() => {\n' +
    '    return new Date().toISOString().split(\'T\')[0];\n' +
    '  });'
  );

  // Restore dueDate
  content = content.replace(
    '  const [dueDate, setDueDate] = useState("");',
    '  const [dueDate, setDueDate] = useState(() => {\n' +
    '    const date = new Date();\n' +
    '    date.setDate(date.getDate() + 7);\n' +
    '    return date.toISOString().split(\'T\')[0];\n' +
    '  });'
  );

  // Restore default line items
  content = content.replace(
    '  const [items, setItems] = useState([\n' +
    '    { productName: "", hsnSac: "", qty: 1, rate: 0, gstRate: 18 }\n' +
    '  ]);',
    '  const [items, setItems] = useState([\n' +
    '    { productName: "Day cream 50gms", hsnSac: "33049910", qty: 25, rate: 200, gstRate: 18 },\n' +
    '    { productName: "Face cream 30gm", hsnSac: "33049910", qty: 50, rate: 450, gstRate: 18 },\n' +
    '    { productName: "Hair oil 100ml", hsnSac: "33059011", qty: 30, rate: 250, gstRate: 18 }\n' +
    '  ]);'
  );

  // Restore default terms & conditions
  content = content.replace(
    '  const [terms, setTerms] = useState("");',
    '  const [terms, setTerms] = useState(company.terms || "Goods once sold will not be taken back or exchanged");'
  );

  fs.writeFileSync(createInvoicePath, denormalize(content), 'utf8');
  console.log('Successfully restored builder dates, terms and line items');
}

// 3. Update App.jsx migration hook to only clear NEXTLIFE
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');
  content = normalize(content);

  const targetMigration = '  // Migration check: If the user\'s local storage contains mock data, force reset\n' +
    '  useEffect(() => {\n' +
    '    const localComp = localStorage.getItem("gst_company");\n' +
    '    const localInvoices = localStorage.getItem("gst_invoices");\n' +
    '    if (\n' +
    '      (localComp && (localComp.includes("THE UNIT OF JAMIL GROUPS") || localComp.includes("NEXTLIFE") || localComp.includes("Nextlife"))) ||\n' +
    '      (localInvoices && localInvoices.includes("JEHIS ONLINE MARKETING"))\n' +
    '    ) {\n' +
    '      localStorage.clear();\n' +
    '      window.location.reload();\n' +
    '    }\n' +
    '  }, []);';

  const replacementMigration = '  // Migration check: If the user\'s local storage contains the old "NEXTLIFE" branding, force reset\n' +
    '  useEffect(() => {\n' +
    '    const localComp = localStorage.getItem("gst_company");\n' +
    '    if (localComp && (localComp.includes("NEXTLIFE") || localComp.includes("Nextlife"))) {\n' +
    '      localStorage.clear();\n' +
    '      window.location.reload();\n' +
    '    }\n' +
    '  }, []);';

  content = content.replace(targetMigration, replacementMigration);

  fs.writeFileSync(appPath, denormalize(content), 'utf8');
  console.log('Successfully reverted App.jsx migration safety check');
}
