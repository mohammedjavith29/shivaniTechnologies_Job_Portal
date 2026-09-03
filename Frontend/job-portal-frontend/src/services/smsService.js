import api from "./api";

export const sendSingleSms = (phoneNumber, message) => {
  return api.post("/sms/single", {
    phoneNumbers: [phoneNumber],
    message: message,
  });
};

export const sendBulkSms = (phoneNumbers, message) => {
  return api.post("/sms/bulk", {
    phoneNumbers: phoneNumbers,
    message: message,
  });
};