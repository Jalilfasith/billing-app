export const initialCompanyDetails = {
  name: "THE UNIT OF JAMIL GROUPS",
  legalName: "JAFFAN BANU JAFFER ALI",
  subtitle: "A Unit of Jamil Groups",
  gstin: "33ASLPJ0181C1Z7",
  phone: "+91 98765 43210",
  email: "contact@jamilgroups.com",
  website: "www.jamilgroups.com",
  address: "NO-56B, WEST NEEM STREET, ASHOKA TREE STREET, GANDHI NAGAR POST, KURINJIPADI TK, Neyveli, Cuddalore, Tamil Nadu - 607308",
  bankName: "State Bank of India",
  bankBranch: "NEYVELI",
  bankAccountNo: "39876543210",
  bankIfsc: "SBIN0001234",
  accountName: "JAFFAN BANU JAFFER ALI",
  upiId: "jamilgroups@sbi",
  terms: "Goods once sold will not be taken back or exchanged",
  logoUrl: "/jamil_logo.png",
  signatureUrl: "/jamil_signature.jpg",
  qrCodeUrl: "/qr_code.png",
  signatureText: "For THE UNIT OF JAMIL GROUPS"
};

export const initialCustomers = [
  {
    id: "cust-1",
    name: "JEHIS ONLINE MARKETING",
    address: "4-306H/10, CMC Nagar (opp. CMC School), Thammathukonam, Nagercoil, Kanniyakumari, Tamil Nadu, 629004",
    shippingAddress: "4-306H/10, CMC Nagar (opp. CMC School), Thammathukonam, Nagercoil, Kanniyakumari, Tamil Nadu, 629004",
    phone: "9442551622",
    gstin: "33BPPJ1074G1ZR",
    pan: "BBPPJ1074G",
    placeOfSupply: "Tamil Nadu"
  },
  {
    id: "cust-2",
    name: "ORGANIC GLOW COSMETICS",
    address: "12/4B, Main Road, Kovilpatti, Thoothukudi, Tamil Nadu, 628501",
    shippingAddress: "12/4B, Main Road, Kovilpatti, Thoothukudi, Tamil Nadu, 628501",
    phone: "9876543210",
    gstin: "33AABCX1234F1Z0",
    pan: "AABCX1234F",
    placeOfSupply: "Tamil Nadu"
  }
];

export const initialProducts = [
  {
    id: "prod-1",
    name: "Day cream 50gms",
    unitPrice: 200,
    gstRate: 18,
    hsnSac: "33049910"
  },
  {
    id: "prod-2",
    name: "Face cream 30gm",
    unitPrice: 450,
    gstRate: 18,
    hsnSac: "33049910"
  },
  {
    id: "prod-3",
    name: "Hair oil 100ml",
    unitPrice: 250,
    gstRate: 18,
    hsnSac: "33059011"
  }
];

export const initialInvoices = [
  {
    id: "inv-1",
    invoiceNo: "JM 01",
    invoiceDate: "2026-07-04",
    dueDate: "2026-07-11",
    customerId: "cust-1",
    items: [
      { productName: "Day cream 50gms", hsnSac: "33049910", qty: 25, rate: 200, gstRate: 18 },
      { productName: "Face cream 30gm", hsnSac: "33049910", qty: 50, rate: 450, gstRate: 18 },
      { productName: "Hair oil 100ml", hsnSac: "33059011", qty: 30, rate: 250, gstRate: 18 }
    ],
    terms: "Goods once sold will not be taken back or exchanged",
    receivedAmount: 0,
    notes: "Thank you for your business!"
  }
];
