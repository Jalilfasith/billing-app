const fs = require('fs');

const mockDataPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/data/mockData.js';
const createInvoicePath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx';
const companyDetailsPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CompanyDetails.jsx';
const customerDetailsPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CustomerDetails.jsx';
const productMgmtPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/ProductManagement.jsx';
const appPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/App.jsx';

const normalize = (str) => str.replace(/\r\n/g, '\n');
const denormalize = (str) => str.replace(/\n/g, '\r\n');

// 1. Wipe mockData.js
if (fs.existsSync(mockDataPath)) {
  const blankMockData = 'export const initialCompanyDetails = {\n' +
    '  name: "",\n' +
    '  legalName: "",\n' +
    '  subtitle: "",\n' +
    '  gstin: "",\n' +
    '  phone: "",\n' +
    '  email: "",\n' +
    '  website: "",\n' +
    '  address: "",\n' +
    '  bankName: "",\n' +
    '  bankBranch: "",\n' +
    '  bankAccountNo: "",\n' +
    '  bankIfsc: "",\n' +
    '  accountName: "",\n' +
    '  upiId: "",\n' +
    '  terms: "",\n' +
    '  logoUrl: "",\n' +
    '  signatureUrl: "",\n' +
    '  qrCodeUrl: "",\n' +
    '  signatureText: ""\n' +
    '};\n\n' +
    'export const initialCustomers = [];\n\n' +
    'export const initialProducts = [];\n\n' +
    'export const initialInvoices = [];\n';

  fs.writeFileSync(mockDataPath, denormalize(blankMockData), 'utf8');
  console.log('Successfully wiped mockData.js');
}

// 2. Update App.jsx migration hook to force reset once
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');
  content = normalize(content);

  content = content.replace(
    '    if (localComp && (localComp.includes("NEXTLIFE") || localComp.includes("Nextlife"))) {',
    '    if (localComp && (localComp.includes("THE UNIT OF JAMIL GROUPS") || localComp.includes("NEXTLIFE") || localComp.includes("Nextlife"))) {'
  );

  fs.writeFileSync(appPath, denormalize(content), 'utf8');
  console.log('Updated App.jsx migration hook');
}

// 3. Update CreateInvoice.jsx
if (fs.existsSync(createInvoicePath)) {
  let content = fs.readFileSync(createInvoicePath, 'utf8');
  content = normalize(content);

  // Clear default builder state items
  const oldItemsState = '  const [items, setItems] = useState([\n' +
    '    { productName: "Day cream 50gms", hsnSac: "33049910", qty: 25, rate: 200, gstRate: 18 },\n' +
    '    { productName: "Face cream 30gm", hsnSac: "33049910", qty: 50, rate: 450, gstRate: 18 },\n' +
    '    { productName: "Hair oil 100ml", hsnSac: "33059011", qty: 30, rate: 250, gstRate: 18 }\n' +
    '  ]);';
  const newItemsState = '  const [items, setItems] = useState([\n' +
    '    { productName: "", hsnSac: "", qty: 1, rate: 0, gstRate: 18 }\n' +
    '  ]);';
  content = content.replace(oldItemsState, newItemsState);

  // Clear default invoiceNo, terms, notes
  content = content.replace('useState("JM 01");', 'useState("");');
  content = content.replace('useState("Goods once sold will not be taken back or exchanged");', 'useState("");');
  content = content.replace('useState("Thank you for your business!");', 'useState("");');

  // Input placeholders and helper text
  content = content.replace('placeholder="JM 01"', 'placeholder="Auto Generated"');
  content = content.replace('className="input-premium font-semibold"', 'placeholder="Enter Customer Name" className="input-premium font-semibold"');
  content = content.replace('className="input-premium resize-none leading-relaxed"', 'placeholder="Enter Full Address" className="input-premium resize-none leading-relaxed"');
  
  // Add detailed format helper comments under client input fields
  content = content.replace(
    '              <input \n' +
    '                type="text"\n' +
    '                placeholder="33XXXXXXXXXXXXX"\n' +
    '                value={clientGstin}\n' +
    '                onChange={(e) => setClientGstin(e.target.value.toUpperCase())}\n' +
    '                className="input-premium font-mono"\n' +
    '              />',
    '              <input \n' +
    '                type="text"\n' +
    '                placeholder="Enter 15-digit GSTIN"\n' +
    '                value={clientGstin}\n' +
    '                onChange={(e) => setClientGstin(e.target.value.toUpperCase())}\n' +
    '                className="input-premium font-mono"\n' +
    '              />\n' +
    '              <span className="text-[9px] text-slate-500 block mt-1">Format: 15-character ID (e.g. 33ASLPJ0181C1Z7)</span>'
  );

  content = content.replace(
    '              <input \n' +
    '                type="text"\n' +
    '                placeholder="ABCDE1234F"\n' +
    '                value={clientPan}\n' +
    '                onChange={(e) => setClientPan(e.target.value.toUpperCase())}\n' +
    '                className="input-premium font-mono"\n' +
    '              />',
    '              <input \n' +
    '                type="text"\n' +
    '                placeholder="Enter 10-digit PAN"\n' +
    '                value={clientPan}\n' +
    '                onChange={(e) => setClientPan(e.target.value.toUpperCase())}\n' +
    '                className="input-premium font-mono"\n' +
    '              />\n' +
    '              <span className="text-[9px] text-slate-500 block mt-1">Format: 10-character code (e.g. ABCDE1234F)</span>'
  );

  content = content.replace(
    '              <input \n' +
    '                type="text"\n' +
    '                value={clientMobile}\n' +
    '                onChange={(e) => setClientMobile(e.target.value)}\n' +
    '                className="input-premium"\n' +
    '              />',
    '              <input \n' +
    '                type="text"\n' +
    '                placeholder="Enter 10-digit Mobile Number"\n' +
    '                value={clientMobile}\n' +
    '                onChange={(e) => setClientMobile(e.target.value)}\n' +
    '                className="input-premium"\n' +
    '              />\n' +
    '              <span className="text-[9px] text-slate-500 block mt-1">Format: 10 digits without country code</span>'
  );

  content = content.replace(
    '              <input \n' +
    '                type="text"\n' +
    '                value={clientState}\n' +
    '                onChange={(e) => setClientState(e.target.value)}\n' +
    '                className="input-premium"\n' +
    '              />',
    '              <input \n' +
    '                type="text"\n' +
    '                placeholder="Enter Supply Place (State)"\n' +
    '                value={clientState}\n' +
    '                onChange={(e) => setClientState(e.target.value)}\n' +
    '                className="input-premium"\n' +
    '              />\n' +
    '              <span className="text-[9px] text-slate-500 block mt-1">State name (e.g. Tamil Nadu)</span>'
  );

  // Shipping
  content = content.replace(
    '                <input \n' +
    '                  type="text"\n' +
    '                  value={shippingName}\n' +
    '                  onChange={(e) => setShippingName(e.target.value)}\n' +
    '                  className="input-premium"\n' +
    '                />',
    '                <input \n' +
    '                  type="text"\n' +
    '                  placeholder="Enter Recipient Name"\n' +
    '                  value={shippingName}\n' +
    '                  onChange={(e) => setShippingName(e.target.value)}\n' +
    '                  className="input-premium"\n' +
    '                />'
  );
  content = content.replace(
    '                <textarea \n' +
    '                  rows="2"\n' +
    '                  value={shippingAddress}\n' +
    '                  onChange={(e) => setShippingAddress(e.target.value)}\n' +
    '                  className="input-premium resize-none leading-relaxed"\n' +
    '                />',
    '                <textarea \n' +
    '                  rows="2"\n' +
    '                  placeholder="Enter Shipping Address"\n' +
    '                  value={shippingAddress}\n' +
    '                  onChange={(e) => setShippingAddress(e.target.value)}\n' +
    '                  className="input-premium resize-none leading-relaxed"\n' +
    '                />'
  );
  content = content.replace(
    '                <input \n' +
    '                  type="text"\n' +
    '                  value={shippingState}\n' +
    '                  onChange={(e) => setShippingState(e.target.value)}\n' +
    '                  className="input-premium"\n' +
    '                />',
    '                <input \n' +
    '                  type="text"\n' +
    '                  placeholder="Enter Destination State"\n' +
    '                  value={shippingState}\n' +
    '                  onChange={(e) => setShippingState(e.target.value)}\n' +
    '                  className="input-premium"\n' +
    '                />'
  );

  fs.writeFileSync(createInvoicePath, denormalize(content), 'utf8');
  console.log('Updated CreateInvoice.jsx with empty states and format guides');
}

// 4. Update CompanyDetails.jsx
if (fs.existsSync(companyDetailsPath)) {
  let content = fs.readFileSync(companyDetailsPath, 'utf8');
  content = normalize(content);

  // Add placeholders and format comments to company registration fields
  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="name"\n' +
    '                    value={formData.name}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-semibold"\n' +
    '                    required\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="name"\n' +
    '                    placeholder="Enter Company Name"\n' +
    '                    value={formData.name}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-semibold"\n' +
    '                    required\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Enter your registered business trading name</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="legalName"\n' +
    '                    value={formData.legalName}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="legalName"\n' +
    '                    placeholder="Enter Legal Name (Proprietor)"\n' +
    '                    value={formData.legalName}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Name of the proprietor or legal entity</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="subtitle"\n' +
    '                    value={formData.subtitle}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="subtitle"\n' +
    '                    placeholder="Enter Subtitle / Description"\n' +
    '                    value={formData.subtitle}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="gstin"\n' +
    '                    value={formData.gstin}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-bold"\n' +
    '                    required\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="gstin"\n' +
    '                    placeholder="Enter 15-digit GSTIN"\n' +
    '                    value={formData.gstin}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-bold"\n' +
    '                    required\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Format: 15 characters (e.g. 33ASLPJ0181C1Z7)</span>'
  );

  content = content.replace(
    '                  <textarea\n' +
    '                    rows="3"\n' +
    '                    name="address"\n' +
    '                    value={formData.address}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition resize-none leading-relaxed"\n' +
    '                    required\n' +
    '                  />',
    '                  <textarea\n' +
    '                    rows="3"\n' +
    '                    name="address"\n' +
    '                    placeholder="Enter Full Billing Address"\n' +
    '                    value={formData.address}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition resize-none leading-relaxed"\n' +
    '                    required\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Enter complete street address, city, state, and pin code</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="phone"\n' +
    '                    value={formData.phone}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="phone"\n' +
    '                    placeholder="Enter 10-digit Mobile Number"\n' +
    '                    value={formData.phone}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">10-digit number without country code</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="email"\n' +
    '                    name="email"\n' +
    '                    value={formData.email}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="email"\n' +
    '                    name="email"\n' +
    '                    placeholder="Enter Email Address"\n' +
    '                    value={formData.email}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Format: contact@domain.com</span>'
  );

  // Bank
  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="bankName"\n' +
    '                    value={formData.bankName}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="bankName"\n' +
    '                    placeholder="Enter Bank Name"\n' +
    '                    value={formData.bankName}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">e.g. State Bank of India</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="bankAccountNo"\n' +
    '                    value={formData.bankAccountNo}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="bankAccountNo"\n' +
    '                    placeholder="Enter Bank Account Number"\n' +
    '                    value={formData.bankAccountNo}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">9 to 18 digit account number</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="bankBranch"\n' +
    '                    value={formData.bankBranch}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="bankBranch"\n' +
    '                    placeholder="Enter Bank Branch"\n' +
    '                    value={formData.bankBranch}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="bankIfsc"\n' +
    '                    value={formData.bankIfsc}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="bankIfsc"\n' +
    '                    placeholder="Enter IFSC Code"\n' +
    '                    value={formData.bankIfsc}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Format: 11 characters (e.g. SBIN0001234)</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="signatureText"\n' +
    '                    value={formData.signatureText}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="signatureText"\n' +
    '                    placeholder="Enter Signatory Subtitle (e.g. For Jamil Groups)"\n' +
    '                    value={formData.signatureText}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="upiId"\n' +
    '                    value={formData.upiId || ""}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"\n' +
    '                    placeholder="e.g. jamilgroups@sbi"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="upiId"\n' +
    '                    value={formData.upiId || ""}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"\n' +
    '                    placeholder="Enter UPI ID"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Format: upiname@bank (e.g. jamilgroups@sbi)</span>'
  );

  content = content.replace(
    '                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                    Settlement QR Code (Image Upload)\n' +
    '                  </label>',
    '                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">\n' +
    '                    Settlement QR Code\n' +
    '                  </label>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="file"\n' +
    '                    accept="image/*"\n' +
    '                    onChange={handleFileChange}\n' +
    '                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="file"\n' +
    '                    accept="image/*"\n' +
    '                    onChange={handleFileChange}\n' +
    '                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none transition"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Upload QR Code image (PNG/JPG)</span>'
  );

  fs.writeFileSync(companyDetailsPath, denormalize(content), 'utf8');
  console.log('Updated CompanyDetails.jsx placeholders and format guides');
}

// 5. Update CustomerDetails.jsx
if (fs.existsSync(customerDetailsPath)) {
  let content = fs.readFileSync(customerDetailsPath, 'utf8');
  content = normalize(content);

  // Add placeholders and format comments to Customer registration fields
  content = content.replace('name="name"', 'name="name" placeholder="Enter Customer Name"');
  content = content.replace('name="address"\n                    rows="3"', 'name="address"\n                    placeholder="Enter Full Address"\n                    rows="3"');
  content = content.replace('name="shippingAddress"\n                    rows="3"', 'name="shippingAddress"\n                    placeholder="Enter Shipping Address"\n                    rows="3"');
  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="phone"\n' +
    '                    value={formData.phone}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="phone"\n' +
    '                    placeholder="Enter 10-digit Mobile Number"\n' +
    '                    value={formData.phone}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Format: 10-digit mobile number</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="gstin"\n' +
    '                    value={formData.gstin}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-bold"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="gstin"\n' +
    '                    placeholder="Enter 15-digit GSTIN"\n' +
    '                    value={formData.gstin}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-bold"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Format: 15-character GSTIN</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="pan"\n' +
    '                    value={formData.pan}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="pan"\n' +
    '                    placeholder="Enter 10-digit PAN"\n' +
    '                    value={formData.pan}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">Format: 10-character PAN (e.g. ABCDE1234F)</span>'
  );

  content = content.replace(
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="placeOfSupply"\n' +
    '                    value={formData.placeOfSupply}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />',
    '                  <input\n' +
    '                    type="text"\n' +
    '                    name="placeOfSupply"\n' +
    '                    placeholder="Enter Supply Place (State)"\n' +
    '                    value={formData.placeOfSupply}\n' +
    '                    onChange={handleChange}\n' +
    '                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition"\n' +
    '                  />\n' +
    '                  <span className="text-[9px] text-slate-500 block mt-1">State name of supply destination</span>'
  );

  fs.writeFileSync(customerDetailsPath, denormalize(content), 'utf8');
  console.log('Updated CustomerDetails.jsx placeholders and format guides');
}

// 6. Update ProductManagement.jsx
if (fs.existsSync(productMgmtPath)) {
  let content = fs.readFileSync(productMgmtPath, 'utf8');
  content = normalize(content);

  // Add placeholders and format comments to Product registration fields
  content = content.replace(
    '              <input\n' +
    '                type="text"\n' +
    '                placeholder="e.g. Day cream 50gms"\n' +
    '                value={name}\n' +
    '                onChange={(e) => setName(e.target.value)}\n' +
    '                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-semibold"\n' +
    '                required\n' +
    '              />',
    '              <input\n' +
    '                type="text"\n' +
    '                placeholder="Enter Product Name"\n' +
    '                value={name}\n' +
    '                onChange={(e) => setName(e.target.value)}\n' +
    '                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-semibold"\n' +
    '                required\n' +
    '              />\n' +
    '              <span className="text-[9px] text-slate-500 block mt-1">Enter detailed name or specification of the product</span>'
  );

  content = content.replace(
    '              <input\n' +
    '                type="text"\n' +
    '                placeholder="e.g. 33049910"\n' +
    '                value={hsnSac}\n' +
    '                onChange={(e) => setHsnSac(e.target.value)}\n' +
    '                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-semibold"\n' +
    '              />',
    '              <input\n' +
    '                type="text"\n' +
    '                placeholder="Enter HSN/SAC Code"\n' +
    '                value={hsnSac}\n' +
    '                onChange={(e) => setHsnSac(e.target.value)}\n' +
    '                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-mono font-semibold"\n' +
    '              />\n' +
    '              <span className="text-[9px] text-slate-500 block mt-1">Format: 4, 6, or 8 digit tariff number</span>'
  );

  content = content.replace(
    '              <input\n' +
    '                type="number"\n' +
    '                placeholder="e.g. 200"\n' +
    '                value={unitPrice}\n' +
    '                onChange={(e) => setUnitPrice(e.target.value)}\n' +
    '                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-semibold"\n' +
    '                required\n' +
    '              />',
    '              <input\n' +
    '                type="number"\n' +
    '                placeholder="Enter Selling Price (₹)"\n' +
    '                value={unitPrice}\n' +
    '                onChange={(e) => setUnitPrice(e.target.value)}\n' +
    '                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-3 py-2 text-sm outline-none transition font-semibold"\n' +
    '                required\n' +
    '              />\n' +
    '              <span className="text-[9px] text-slate-500 block mt-1">Excludes GST amount</span>'
  );

  fs.writeFileSync(productMgmtPath, denormalize(content), 'utf8');
  console.log('Updated ProductManagement.jsx placeholders and format guides');
}
