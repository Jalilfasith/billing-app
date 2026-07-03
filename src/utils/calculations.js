// Utility calculations for GST invoices (Jamil Groups version)

export function getStateFromGstin(gstin) {
  if (!gstin || gstin.length < 2) return "";
  const code = gstin.substring(0, 2);
  const stateCodes = {
    "01": "Jammu & Kashmir", "02": "Himachal Pradesh", "03": "Punjab", "04": "Chandigarh",
    "05": "Uttarakhand", "06": "Haryana", "07": "Delhi", "08": "Rajasthan", "09": "Uttar Pradesh",
    "10": "Bihar", "11": "Sikkim", "12": "Arunachal Pradesh", "13": "Nagaland", "14": "Manipur",
    "15": "Mizoram", "16": "Tripura", "17": "Meghalaya", "18": "Assam", "19": "West Bengal",
    "20": "Jharkhand", "21": "Odisha", "22": "Chhattisgarh", "23": "Madhya Pradesh", "24": "Gujarat",
    "26": "Dadra and Nagar Haveli and Daman and Diu", "27": "Maharashtra", "29": "Karnataka",
    "30": "Goa", "31": "Lakshadweep", "32": "Kerala", "33": "Tamil Nadu", "34": "Puducherry",
    "35": "Andaman & Nicobar Islands", "36": "Telangana", "37": "Andhra Pradesh", "38": "Ladakh"
  };
  return stateCodes[code] || "";
}

export function calculateInvoice(invoice, company) {
  if (!invoice) return null;

  const companyState = getStateFromGstin(company?.gstin) || "Tamil Nadu";
  
  let totalQty = 0;
  let totalTaxable = 0;
  let totalTax = 0;
  
  const itemsDetailed = (invoice.items || []).map(item => {
    const qty = Number(item.qty) || 0;
    const rate = Number(item.rate) || 0;
    const gstRate = Number(item.gstRate) !== undefined ? Number(item.gstRate) : 18;
    
    const taxableAmount = qty * rate;
    const taxAmount = taxableAmount * (gstRate / 100);
    const totalAmount = taxableAmount + taxAmount;
    
    totalQty += qty;
    totalTaxable += taxableAmount;
    totalTax += taxAmount;
    
    return {
      productName: item.productName || item.name || "Custom Item",
      hsnSac: item.hsnSac || "",
      gstRate,
      qty,
      rate,
      taxableAmount,
      taxAmount,
      totalAmount
    };
  });

  const finalTotal = totalTaxable + totalTax;
  
  // Decide CGST/SGST vs IGST
  // Default to CGST/SGST split unless it is flagged as interstate
  const isIntrastate = !invoice.isInterstate;

  // Group tax by GST rate
  const taxSummary = {};
  itemsDetailed.forEach(item => {
    const rate = item.gstRate;
    if (!taxSummary[rate]) {
      taxSummary[rate] = { rate, taxable: 0, tax: 0 };
    }
    taxSummary[rate].taxable += item.taxableAmount;
    taxSummary[rate].tax += item.taxAmount;
  });

  const taxDetails = Object.values(taxSummary);

  return {
    itemsDetailed,
    totalQty,
    totalTaxable,
    totalTax,
    finalTotal,
    isIntrastate,
    taxDetails,
    dueAmount: Math.max(0, finalTotal - (Number(invoice.receivedAmount) || 0))
  };
}

// Convert numbers to words (Indian numbering system: Lakhs, Crores)
export function numberToWords(num) {
  if (num === 0) return "Zero Rupees Only";
  
  const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teenDigits = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const doubleDigits = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
  const formatTens = (n) => {
    if (n < 10) return singleDigits[n];
    if (n < 20) return teenDigits[n - 10];
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return doubleDigits[tens] + (ones ? " " + singleDigits[ones] : "");
  };
  
  const formatHundreds = (n) => {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let str = "";
    if (hundred) {
      str += singleDigits[hundred] + " Hundred";
    }
    if (rest) {
      if (str) str += " and ";
      str += formatTens(rest);
    }
    return str;
  };

  let rupeePart = Math.floor(num);
  let paisaPart = Math.round((num - rupeePart) * 100);
  
  let words = "";
  
  if (rupeePart > 0) {
    // Crores
    const crores = Math.floor(rupeePart / 10000000);
    rupeePart %= 10000000;
    if (crores > 0) {
      words += formatHundreds(crores) + " Crore ";
    }
    
    // Lakhs
    const lakhs = Math.floor(rupeePart / 100000);
    rupeePart %= 100000;
    if (lakhs > 0) {
      words += formatTens(lakhs) + " Lakh ";
    }
    
    // Thousands
    const thousands = Math.floor(rupeePart / 1000);
    rupeePart %= 1000;
    if (thousands > 0) {
      words += formatTens(thousands) + " Thousand ";
    }
    
    // Hundreds
    if (rupeePart > 0) {
      words += formatHundreds(rupeePart) + " ";
    }
    
    words += "Rupees";
  }
  
  if (paisaPart > 0) {
    if (words) words += " and ";
    words += formatTens(paisaPart) + " Paise";
  }
  
  if (words) {
    return words.replace(/\s+/g, ' ').trim() + " Only";
  }
  return "Zero Rupees Only";
}
