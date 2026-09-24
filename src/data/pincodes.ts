export interface PinLocation {
  city: string;
  state: string;
  deliveryDays: number;
}

export const KNOWN_PINCODES: Record<string, PinLocation> = {
  // Madhya Pradesh (Indore & Region)
  '452001': { city: 'Indore', state: 'Madhya Pradesh', deliveryDays: 1 },
  '452002': { city: 'Indore', state: 'Madhya Pradesh', deliveryDays: 1 },
  '452010': { city: 'Indore (Vijay Nagar)', state: 'Madhya Pradesh', deliveryDays: 1 },
  '452007': { city: 'Indore (Sarafa Bazar)', state: 'Madhya Pradesh', deliveryDays: 1 },
  '452016': { city: 'Indore (Bhawarkua)', state: 'Madhya Pradesh', deliveryDays: 1 },
  '462001': { city: 'Bhopal', state: 'Madhya Pradesh', deliveryDays: 2 },
  '456001': { city: 'Ujjain', state: 'Madhya Pradesh', deliveryDays: 2 },
  '482001': { city: 'Jabalpur', state: 'Madhya Pradesh', deliveryDays: 2 },
  '474001': { city: 'Gwalior', state: 'Madhya Pradesh', deliveryDays: 2 },

  // Maharashtra
  '400001': { city: 'Mumbai', state: 'Maharashtra', deliveryDays: 2 },
  '400050': { city: 'Mumbai (Bandra)', state: 'Maharashtra', deliveryDays: 2 },
  '411001': { city: 'Pune', state: 'Maharashtra', deliveryDays: 2 },
  '440001': { city: 'Nagpur', state: 'Maharashtra', deliveryDays: 2 },

  // Delhi NCR
  '110001': { city: 'New Delhi (Connaught Place)', state: 'Delhi', deliveryDays: 2 },
  '110020': { city: 'New Delhi (Okhla)', state: 'Delhi', deliveryDays: 2 },
  '122001': { city: 'Gurugram', state: 'Haryana', deliveryDays: 2 },
  '201301': { city: 'Noida', state: 'Uttar Pradesh', deliveryDays: 2 },

  // Karnataka
  '560001': { city: 'Bengaluru (MG Road)', state: 'Karnataka', deliveryDays: 3 },
  '560034': { city: 'Bengaluru (Koramangala)', state: 'Karnataka', deliveryDays: 3 },
  '560038': { city: 'Bengaluru (Indiranagar)', state: 'Karnataka', deliveryDays: 3 },

  // Telangana
  '500001': { city: 'Hyderabad', state: 'Telangana', deliveryDays: 3 },
  '500081': { city: 'Hyderabad (Hitec City)', state: 'Telangana', deliveryDays: 3 },

  // Gujarat
  '380001': { city: 'Ahmedabad', state: 'Gujarat', deliveryDays: 2 },
  '395001': { city: 'Surat', state: 'Gujarat', deliveryDays: 2 },
  '390001': { city: 'Vadodara', state: 'Gujarat', deliveryDays: 2 },

  // Rajasthan
  '302001': { city: 'Jaipur', state: 'Rajasthan', deliveryDays: 2 },
  '342001': { city: 'Jodhpur', state: 'Rajasthan', deliveryDays: 3 },

  // Tamil Nadu
  '600001': { city: 'Chennai', state: 'Tamil Nadu', deliveryDays: 3 },
  '641001': { city: 'Coimbatore', state: 'Tamil Nadu', deliveryDays: 3 },

  // West Bengal
  '700001': { city: 'Kolkata', state: 'West Bengal', deliveryDays: 3 },
};

export function lookupPincode(pin: string): PinLocation | null {
  const cleanPin = pin.trim();
  if (KNOWN_PINCODES[cleanPin]) {
    return KNOWN_PINCODES[cleanPin];
  }
  // Generic PAN India fallback if 6 digits
  if (/^[1-9][0-9]{5}$/.test(cleanPin)) {
    const firstDigit = cleanPin[0];
    const regionMap: Record<string, { state: string; city: string }> = {
      '1': { state: 'Delhi & Northern Region', city: 'North Hub' },
      '2': { state: 'Uttar Pradesh & Uttarakhand', city: 'UP Hub' },
      '3': { state: 'Gujarat & Rajasthan', city: 'West Hub' },
      '4': { state: 'Madhya Pradesh & Maharashtra', city: 'Central Hub' },
      '5': { state: 'Karnataka & Andhra Pradesh', city: 'South Hub' },
      '6': { state: 'Tamil Nadu & Kerala', city: 'South Deep Hub' },
      '7': { state: 'West Bengal & Eastern Region', city: 'East Hub' },
      '8': { state: 'Bihar & Jharkhand', city: 'East Central Hub' },
      '9': { state: 'Western Army Post / Central', city: 'Central Post' },
    };
    const region = regionMap[firstDigit] || { state: 'India', city: 'Metro' };
    return {
      city: region.city,
      state: region.state,
      deliveryDays: 3
    };
  }
  return null;
}
