export const validateCpf = (maskedCpf: string) => {
  const cpf = maskedCpf.replace(/\D/g, "") || "";

  if (cpf === "") return false;

  if (cpf.length !== 11) return false;

  let sum = 0;
  let rest = 0;
  if (
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  )
    return false;

  for (let i = 1; i <= 9; i += 1)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i += 1)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11), 10)) return false;

  return true;
};

export const validateName = (name: string) => {
  return /\d/.test(name);
};

export const validateEmail = (email: string) => {
  return !/\.[a-zA-Z]{2,}$/.test(email);
};

export const validatePhone = (phone: string) => {
  return !/^\d{11}$/.test(phone);
};

interface ValidateFieldsTypes {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  isCreate?: boolean;
}

export const validateFields = ({
  name,
  cpf,
  email,
  phone,
  isCreate,
}: ValidateFieldsTypes) => {
  if (isCreate) {
    if (!name || !cpf || !email || !phone) {
      return { valid: false, message: "Missing required fields" };
    }
  }

  if (email && validateEmail(email)) {
    return { valid: false, message: "Invalid email format" };
  }

  if (name && validateName(name)) {
    return { valid: false, message: "Invalid name format" };
  }

  if (phone && validatePhone(phone)) {
    return { valid: false, message: "Invalid phone number format" };
  }

  if (cpf && !validateCpf(cpf)) {
    return { valid: false, message: "Invalid cpf format" };
  }

  return { valid: true };
};
