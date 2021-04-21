export interface IClient {
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  id: string;
}

export interface IModalProps {
  open: boolean;
  hide: () => void;
  client: IClient | null;
  refetch: () => void;
}

export interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
}