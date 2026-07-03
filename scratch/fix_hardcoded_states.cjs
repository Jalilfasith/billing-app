const fs = require('fs');

const createInvoicePath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx';
const appPath = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/App.jsx';

const normalize = (str) => str.replace(/\r\n/g, '\n');
const denormalize = (str) => str.replace(/\n/g, '\r\n');

// 1. Clear hardcoded states in CreateInvoice.jsx
if (fs.existsSync(createInvoicePath)) {
  let content = fs.readFileSync(createInvoicePath, 'utf8');
  content = normalize(content);

  // Replace invoiceNo initial state
  content = content.replace(
    '  const [invoiceNo, setInvoiceNo] = useState(() => {\n' +
    '    const count = invoices.length;\n' +
    '    return `JM ${String(count + 1).padStart(2, \'0\')}`;\n' +
    '  });',
    '  const [invoiceNo, setInvoiceNo] = useState("");'
  );

  // Replace dates
  content = content.replace(
    '  const [invoiceDate, setInvoiceDate] = useState(() => {\n' +
    '    return new Date().toISOString().split(\'T\')[0];\n' +
    '  });',
    '  const [invoiceDate, setInvoiceDate] = useState("");'
  );
  content = content.replace(
    '  const [dueDate, setDueDate] = useState(() => {\n' +
    '    const date = new Date();\n' +
    '    date.setDate(date.getDate() + 7);\n' +
    '    return date.toISOString().split(\'T\')[0];\n' +
    '  });',
    '  const [dueDate, setDueDate] = useState("");'
  );

  // Replace customer/shipping pre-filled values
  const targetStates = '  // Customer State\n' +
    '  const [selectedCustomerId, setSelectedCustomerId] = useState("");\n' +
    '  const [clientName, setClientName] = useState("JEHIS ONLINE MARKETING");\n' +
    '  const [clientAddress, setClientAddress] = useState("4-306H/10, CMC Nagar (opp. CMC School),\\nThammathukonam, Nagercoil, Kanniyakumari, Tamil Nadu, 629004");\n' +
    '  const [clientMobile, setClientMobile] = useState("9442551622");\n' +
    '  const [clientGstin, setClientGstin] = useState("33BPPJ1074G1ZR");\n' +
    '  const [clientPan, setClientPan] = useState("BBPPJ1074G");\n' +
    '  const [clientState, setClientState] = useState("Tamil Nadu");\n\n' +
    '  // Shipping State\n' +
    '  const [sameAsBilling, setSameAsBilling] = useState(true);\n' +
    '  const [shippingName, setShippingName] = useState("JEHIS ONLINE MARKETING");\n' +
    '  const [shippingAddress, setShippingAddress] = useState("4-306H/10, CMC Nagar (opp. CMC School),\\nThammathukonam, Nagercoil, Kanniyakumari, Tamil Nadu, 629004");\n' +
    '  const [shippingState, setShippingState] = useState("Tamil Nadu");';

  const replacementStates = '  // Customer State\n' +
    '  const [selectedCustomerId, setSelectedCustomerId] = useState("");\n' +
    '  const [clientName, setClientName] = useState("");\n' +
    '  const [clientAddress, setClientAddress] = useState("");\n' +
    '  const [clientMobile, setClientMobile] = useState("");\n' +
    '  const [clientGstin, setClientGstin] = useState("");\n' +
    '  const [clientPan, setClientPan] = useState("");\n' +
    '  const [clientState, setClientState] = useState("");\n\n' +
    '  // Shipping State\n' +
    '  const [sameAsBilling, setSameAsBilling] = useState(true);\n' +
    '  const [shippingName, setShippingName] = useState("");\n' +
    '  const [shippingAddress, setShippingAddress] = useState("");\n' +
    '  const [shippingState, setShippingState] = useState("");';

  content = content.replace(targetStates, replacementStates);

  fs.writeFileSync(createInvoicePath, denormalize(content), 'utf8');
  console.log('Successfully wiped hardcoded states in CreateInvoice.jsx');
}

// 2. Force clear old local storage if "THE UNIT OF JAMIL GROUPS" is present in App.jsx
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');
  content = normalize(content);

  const targetMigration = '  // Migration check: If the user\'s local storage contains the old "NEXTLIFE" branding, force reset\n' +
    '  useEffect(() => {\n' +
    '    const localComp = localStorage.getItem("gst_company");\n' +
    '    if (localComp && (localComp.includes("THE UNIT OF JAMIL GROUPS") || localComp.includes("NEXTLIFE") || localComp.includes("Nextlife"))) {\n' +
    '      localStorage.clear();\n' +
    '      window.location.reload();\n' +
    '    }\n' +
    '  }, []);';

  const replacementMigration = '  // Migration check: If the user\'s local storage contains mock data, force reset\n' +
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

  content = content.replace(targetMigration, replacementMigration);

  fs.writeFileSync(appPath, denormalize(content), 'utf8');
  console.log('Successfully updated localStorage cleaner in App.jsx');
}
