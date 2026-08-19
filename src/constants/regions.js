/**
 * Region & District Categories Configuration
 * Primary Categories: कोंकण, महाराष्ट्र, देश
 * Sub-categories under कोंकण: मालवण, कणकवली, कुडाळ, सावंतवाडी, वेंगुर्ला, देवगड, दोडामार्ग, वैभववाडी
 */

export const REGIONS = [
  { key: 'konkan', name: 'कोंकण' },
  { key: 'maharashtra', name: 'महाराष्ट्र' },
  { key: 'desh', name: 'देश' }
];

export const KONKAN_SUB_CATEGORIES = [
  { id: 1, name: 'मालवण', headline: 'किल्ल्याचेर विक्रमी गर्दी' },
  { id: 2, name: 'कणकवली', headline: 'निवडणूक घोषणा' },
  { id: 3, name: 'कुडाळ', headline: 'गणेशोत्सव तयारी' },
  { id: 4, name: 'सावंतवाडी', headline: 'खेळणी उद्योगाक प्रोत्साहन' },
  { id: 5, name: 'वेंगुर्ला', headline: 'किनारपट्टी विकास' },
  { id: 6, name: 'देवगड', headline: 'आंबा हंगाम चर्चा' },
  { id: 12458, name: 'दोडामार्ग', headline: 'वनविभाग कारवाई' },
  { id: 12471, name: 'वैभववाडी', headline: 'काजू प्रक्रिया अनुदान' }
];

export const KONKAN_TALUKA_NAMES = KONKAN_SUB_CATEGORIES.map(s => s.name);
