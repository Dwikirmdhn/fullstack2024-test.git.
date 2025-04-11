export interface Client {
  id: number;
  name: string;
  slug: string;
  is_project: '0' | '1';
  self_capture: '0' | '1';
  client_prefix: string;
  client_logo: string;
  address?: string;
  phone_number?: string;
  city?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface CreateClientDTO {
  name: string;
  slug: string;
  is_project: '0' | '1';
  self_capture: '0' | '1';
  client_prefix: string;
  client_logo: string;
  address?: string;
  phone_number?: string;
  city?: string;
}

export interface UpdateClientDTO extends Partial<CreateClientDTO> {
  id: number;
}