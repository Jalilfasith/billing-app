import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cacmvfnljnyxjecmcxzh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY212Zm5sam55eGplY21jeHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNDc0NTcsImV4cCI6MjA5ODcyMzQ1N30.gDtROGde4cD03D2BI1HZFNrLFXBAqwZokSGFSiceuVk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Testing insert...");
  const { data, error } = await supabase.from('products').insert({
    id: `prod-${Date.now()}`,
    name: 'Test Product',
    unitPrice: 100,
    gstRate: 18,
    hsnSac: '1234'
  }).select();
  
  if (error) {
    console.error("ERROR:", error);
  } else {
    console.log("SUCCESS:", data);
  }
}

test();
