import { ContactTypes } from "../types";
import { endpoints } from "./endpoints";

interface GetContactListTypes {
  setList(e: ContactTypes[]): void;
  params: string;
  setLoading(e: boolean): void;
}

interface PostContactListTypes {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  setLoading(e: boolean): void;
}
interface PatchContactListTypes {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  id: string;
  setLoading(e: boolean): void;
}

const AUTH__TOKEN = "MTY0NTMyODUwMzc=";
const BASE_URL = "http://localhost:3000";

const fetchWithAuth = (url: string, options: RequestInit = {}) => {
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    token: AUTH__TOKEN,
  };

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  }).then((response) => response.json());
};

export const getContactList = ({
  setList,
  params = "",
  setLoading,
}: GetContactListTypes) => {
  setLoading(true);

  return fetchWithAuth(
    endpoints.getContacts.concat(`?query=${params}`)
  )
    .then(setList)
    .catch((err) => err)
    .finally(() => setLoading(false));
};

export const postContactList = ({
  setLoading,
  name,
  cpf,
  email,
  phone,
}: PostContactListTypes) => {
  setLoading(true);

  return fetchWithAuth(endpoints.postContact, {
    method: "POST",
    body: JSON.stringify({ name, cpf, email, phone }),
  })
    .then((response) => {
      if ("status" in response && response.status === 200) {
        return response;
      }

      return Promise.reject(response);
    })
    .catch((err) => Promise.reject(err))
    .finally(() => setLoading(false));
};

export const patchContactList = ({
  setLoading,
  name,
  cpf,
  email,
  phone,
  id,
}: PatchContactListTypes) => {
  setLoading(true);

  return fetchWithAuth(endpoints.updateContact.replace(":id", id), {
    method: "PATCH",
    body: JSON.stringify({ name, cpf, email, phone }),
  })
    .then((response) => {
      if ("status" in response && response.status === 200) {
        return response;
      }

      return Promise.reject(response);
    })
    .catch((err) => Promise.reject(err))
    .finally(() => setLoading(false));
};
