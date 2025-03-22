import { endpoints } from "./endpoints";
import {
  DeleteContactListTypes,
  GetContactListTypes,
  GetContactPhotoTypes,
  PatchContactListTypes,
  PatchContactPhotoTypes,
  PostContactListTypes,
} from "./types";

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

export const deleteContact = ({
  setLoading,
  id,
}: DeleteContactListTypes) => {
  setLoading(true);

  return fetchWithAuth(endpoints.deleteContact.replace(":id", id), {
    method: "DELETE",
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

export const getContactPhoto = ({
  id,
  setLoading,
}: GetContactPhotoTypes) => {
  setLoading(true);

  return fetchWithAuth(endpoints.getContactPhoto.replace(":id", id))
    .then((response) => {
      if ("status" in response && response.status === 200) {
        return response;
      }
      return Promise.reject(response);
    })
    .catch((err) => Promise.reject(err))
    .finally(() => setLoading(false));
};

export const createContactPhoto = ({
  id,
  photo,
}: PatchContactPhotoTypes) => {
  return fetchWithAuth(endpoints.includePhoto.replace(":id", id), {
    method: "PATCH",
    body: JSON.stringify({ photo }),
  })
    .then((response) => {
      if ("status" in response && response.status === 200) {
        return response;
      }

      return Promise.reject(response);
    })
    .catch((err) => Promise.reject(err));
};

export const deleteContactPhoto = ({
  setLoading,
  id,
}: DeleteContactListTypes) => {
  setLoading(true);

  return fetchWithAuth(endpoints.deleteContact.replace(":id", id), {
    method: "DELETE",
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
