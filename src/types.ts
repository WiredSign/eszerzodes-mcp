export interface ApiResponse<T = unknown> {
  status: string;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedData<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}

export interface Contract {
  id: number;
  subject: string;
  status: string;
  owner_user_id: number;
  own_id?: string;
  created_at?: string;
  updated_at?: string;
  expiration_date?: string;
  finalized_at?: string;
  [key: string]: unknown;
}

export interface Partner {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  [key: string]: unknown;
}

export interface Template {
  id: string;
  name: string;
  language?: string;
  [key: string]: unknown;
}

export interface TemplateField {
  id: number;
  title: string;
  name: string;
  field_type: string;
  options?: string;
  [key: string]: unknown;
}

export interface ContractStatus {
  id: number;
  name: string;
  color: string;
  [key: string]: unknown;
}

export interface Coworker {
  id: number;
  email: string;
  name: string;
  position?: string;
  [key: string]: unknown;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  membership?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface PartnerDetails {
  partner_type?: number;
  signatory_name?: string;
  phone_number?: string;
  address?: string;
  mothers_name?: string;
  birthday?: string;
  place_of_birth?: string;
  company_name?: string;
  company_tax_number?: string;
  company_registered_office?: string;
}

export interface ContractPartner {
  position: number;
  email: string;
  title?: string;
  partner_details?: PartnerDetails;
}

export interface CreateContractFromTemplateBody {
  contract_type_id: number;
  title: string;
  client_title?: string;
  trustee_title?: string;
  allowed_user_type?: number;
  own_id?: string;
  has_expiration_date?: boolean;
  expiration_date?: string;
  expiration_date_title?: string;
  intro_disabled?: boolean;
  accompanying_message?: string;
  need_validation?: number;
  callback_url?: string;
  copy_to_email?: string;
  redirect_url?: string;
  template_data?: Record<string, string>;
  contract_public_url?: boolean;
  partners?: ContractPartner[];
}

export interface CreateContractFromPdfBody {
  title: string;
  pdf_url: string;
  partners: ContractPartner[];
  is_one_sided: boolean;
  language: string;
  hide_service_provider_details: boolean;
  need_validation: number;
  client_title?: string;
  trustee_title?: string;
  own_id?: string;
  allowed_user_type?: number;
  has_expiration_date?: boolean;
  expiration_date?: string;
  expiration_date_title?: string;
  intro_disabled?: boolean;
  accompanying_message?: string;
  sign_now?: boolean;
  copy_to_email?: string;
  contract_public_url?: boolean;
  callback_url?: string;
  redirect_url?: string;
  pdf_base64?: string;
  signer_count?: number;
}

export interface CreateContractFromHtmlBody {
  title: string;
  html_content: string;
  partners: ContractPartner[];
  is_one_sided: boolean | number;
  language: string;
  hide_service_provider_details: boolean;
  need_validation: number;
  client_title?: string;
  trustee_title?: string;
  own_id?: string;
  allowed_user_type?: number;
  has_expiration_date?: boolean;
  expiration_date?: string;
  expiration_date_title?: string;
  intro_disabled?: boolean;
  accompanying_message?: string;
  sign_now?: boolean;
  callback_url?: string;
  redirect_url?: string;
  copy_to_email?: string;
  contract_public_url?: boolean;
  signer_count?: number;
}

export interface SendInvitationBody {
  email: string;
  position: number;
  partner_details?: PartnerDetails;
}

export interface CreateSharedLinkBody {
  contract_id: number;
  email_address: string;
  lifetime: number;
}

export interface AddAttachmentBody {
  attachment_type: "invoice" | "link" | "contract";
  attachment_invoice_number?: string;
  attachment_contract_identifier?: number;
  attachment_contract_visibility?: "public" | "private";
  link?: {
    type?: string;
    title?: string;
    hyperlink?: string;
    visibility?: "public" | "private";
  };
}

export interface RemoveAttachmentBody {
  attachment_type: "invoice" | "link" | "contract";
  attachment_identifier: number;
}

export interface CreateTemplateBody {
  title: string;
  client_title?: string;
  trustee_title?: string;
  template_content?: string;
  template_intro?: string;
  lang?: string;
  signer_count?: number;
  single_signature?: boolean;
  allowed_user?: number;
  partner_3_title?: string;
  partner_4_title?: string;
}

export interface CreateContractStatusBody {
  name: string;
  color: string;
  email_to?: string;
  email_subject?: string;
  email_body?: string;
  permissions?: number[];
}
