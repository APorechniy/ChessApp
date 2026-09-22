export const validatePhone = (phone: string) => {
  const phoneReg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  return phoneReg.test(phone);
};
