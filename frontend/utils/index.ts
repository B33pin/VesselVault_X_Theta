export const daysLeft = (deadline: Date | any): string => {
  const difference: number = new Date(deadline).getTime() - Date.now();
  const remainingDays: number = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (
  goal: number,
  raisedAmount: number
): number => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const shortAddress = (address: string, initial = 5, ending = 5) => {
  return address.slice(0, initial) + "..." + address.slice(-ending);
};

export const validateAddress = (address: string) => {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
};

export const BloodType: any = {
  2: "A+",
  3: "A-",
  4: "B+",
  5: "B-",
  0: "AB+",
  1: "AB-",
  6: "O+",
  7: "O-",
};

export const BloodStatus: any = {
  0: "Available",
  1: "Expired",
  2: "Received",
};

export const isValidAddress = (address: string): boolean => {
  if (typeof address !== "string" || address.length === 0) {
    return false;
  }

  if (address.startsWith("0x")) {
    address = address.slice(2);
  }

  const hexRegex = /^[0-9A-Fa-f]{40}$/;
  if (!hexRegex.test(address)) {
    return false;
  }

  return true;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^(\+\d{1,3}\s?)?\d{10}$/;
  return phoneRegex.test(phoneNumber);
};

export const isValidZipCode = (zipCode: string): boolean => {
  const zipCodePattern: RegExp = /^\d{5}$|^\d{5}-\d{4}$/;
  return zipCodePattern.test(zipCode);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
