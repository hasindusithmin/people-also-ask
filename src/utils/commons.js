import { toast } from "react-toastify"

export function downloadSvgAsPng(svgElement, filename) {
  try {
    // Convert SVG element to XML string
    const svgXml = new XMLSerializer().serializeToString(svgElement);

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Create an image element
    const img = new Image();

    // Set up an event listener for the image load
    img.onload = function () {
      // Set canvas dimensions to match the SVG element
      canvas.width = svgElement.width.baseVal.value;
      canvas.height = svgElement.height.baseVal.value;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert the canvas content to a data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;

      // Programmatically click the link to trigger the download
      link.click();
    };

    // Set the source of the image to the SVG XML
    img.src = 'data:image/svg+xml;base64,' + btoa(svgXml);
  } catch (error) {
    toast.error("Sorry, can't download chart at this moment", { autoClose: 250, hideProgressBar: true })
  }
}

function downloadSvgAsJpg(svgElement, filename) {
  try {
    // Convert SVG element to XML string
    const svgXml = new XMLSerializer().serializeToString(svgElement);

    // Create a Blob from the SVG XML
    const blob = new Blob([svgXml], { type: 'image/svg+xml' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an image element
    const img = new Image();

    // Set up an event listener for the image load
    img.onload = function () {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions to match the SVG element
      canvas.width = svgElement.width.baseVal.value;
      canvas.height = svgElement.height.baseVal.value;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert the canvas content to a data URL
      const dataUrl = canvas.toDataURL('image/jpeg');

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    };

    // Set the source of the image to the temporary URL
    img.src = url;
  } catch (error) {
    toast.error("Sorry, can't download chart at this moment", { autoClose: 250, hideProgressBar: true });
  }
}


export const downloadChart = (parent) => {
  try {
    const container = document.getElementById(parent);
    const svgElement = container.children[0].children[0]
    downloadSvgAsJpg(svgElement, `${parent}.jpg`)
  } catch (error) {
    console.log(error.message);
    toast.error("Sorry, can't download chart at this moment", { autoClose: 250, hideProgressBar: true })
  }
}

export function copyToClipboard(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  toast.success(`Copied to the clipboard`, { hideProgressBar: true, autoClose: 250, position: 'top-left' })
}


export function isMobile() {
  return window.innerWidth < 601;
}

export function isLarge() {
  return window.innerWidth > 1280;
}

export const codes = {
  'Argentina': 'AR',
  'Australia': 'AU',
  'Austria': 'AT',
  'Belgium': 'BE',
  'Brazil': 'BR',
  'Canada': 'CA',
  'Chile': 'CL',
  'Colombia': 'CO',
  'Czechia': 'CZ',
  'Denmark': 'DK',
  'Egypt': 'EG',
  'Finland': 'FI',
  'France': 'FR',
  'Germany': 'DE',
  'Greece': 'GR',
  'Hong Kong': 'HK',
  'Hungary': 'HU',
  'India': 'IN',
  'Indonesia': 'ID',
  'Ireland': 'IE',
  'Israel': 'IL',
  'Italy': 'IT',
  'Japan': 'JP',
  'Kenya': 'KE',
  'Malaysia': 'MY',
  'Mexico': 'MX',
  'Netherlands': 'NL',
  'New Zealand': 'NZ',
  'Nigeria': 'NG',
  'Norway': 'NO',
  'Peru': 'PE',
  'Philippines': 'PH',
  'Poland': 'PL',
  'Portugal': 'PT',
  'Romania': 'RO',
  'Russia': 'RU',
  'Saudi Arabia': 'SA',
  'Singapore': 'SG',
  'South Africa': 'ZA',
  'South Korea': 'KR',
  'Spain': 'ES',
  'Sweden': 'SE',
  'Switzerland': 'CH',
  'Taiwan': 'TW',
  'Thailand': 'TH',
  'Türkiye': 'TR',
  'Ukraine': 'UA',
  'United Kingdom': 'GB',
  'United States': 'US',
  'Vietnam': 'VN'
}
