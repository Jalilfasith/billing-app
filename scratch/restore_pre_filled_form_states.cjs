const fs = require('fs');

const path = 'c:/Users/gokhu/OneDrive/Desktop/billing/src/pages/CreateInvoice.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/\r\n/g, '\n');

  const targetStates = '  // Customer State\n' +
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

  const replacementStates = '  // Customer State\n' +
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

  content = content.replace(targetStates, replacementStates);

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully restored pre-filled billing client details in CreateInvoice.jsx');
}
