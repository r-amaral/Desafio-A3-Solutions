import { ContactTypes } from "../types";

export interface GetContactListTypes {
  setList(e: ContactTypes[]): void;
  params: string;
  setLoading(e: boolean): void;
}

export interface PostContactListTypes {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  setLoading(e: boolean): void;
}

export interface PatchContactListTypes {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  id: string;
  setLoading(e: boolean): void;
}

export interface DeleteContactListTypes {
  id: string;
  setLoading(e: boolean): void;
}

export interface GetContactPhotoTypes {
  id: string;
  setLoading(e: boolean): void;
}

export interface PatchContactPhotoTypes {
  id: string;
  photo: string;
}
