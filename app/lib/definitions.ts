// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type PropertiesTable = {
  id: string;
  name: string;
  street_name: string;
  street_number: string;
  floor_number: string;
  apartment_number: string;
  city: string;
  dgr_code: string;
  municipal_code: string;
  epec_client_number: string;
  epec_contract_number: string;
  water_contract_number: string;
  landlord_name: string;
  tenant_name: string;
  tenant_cuit_cuil: string;
  contact_person_name: string;
  contact_person_phone: string;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  adjustment_frequency_id: number;
  comments: string;
};

export type FrequencyField = {
  id: string;
  name: string;
};

export type BankAccountField = {
  id: string;
  name: string;
};

export type PropertyForm = {
  id: string;
  name: string;
  street_name: string;
  street_number: string;
  floor_number: string;
  apartment_number: string;
  city: string;
  dgr_code: string;
  municipal_code: string;
  epec_client_number: string;
  epec_contract_number: string;
  water_contract_number: string;
  landlord_name: string;
  tenant_name: string;
  tenant_cuit_cuil: string;
  contact_person_name: string;
  contact_person_phone: string;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  adjustment_frequency_id: number;
  bank_account_id: string;
  comments: string;
};

export type ReceiptForm = {
  id: string;
  property_id: string;
  tenant_name: string;
  rental_period_start: string;
  rental_period_end: string;
  property_address: string;
  rent_amount: number;
  rent_paid: boolean;
  dgr_amount: number;
  dgr_paid: boolean;
  water_amount: number;
  water_paid: boolean;
  epec_amount: number;
  epec_paid: boolean;
  municipal_amount: number;
  municipal_paid: boolean;
  expenses_amount: number;
  expenses_paid: boolean;
  various_amount: number;
  various_paid: boolean;
  previous_balance: number;
  previous_balance_paid: boolean;
  total_amount: number;
};

export type ReceiptToPrint = {
  tenant_name: string;
  rental_period_start: string;
  property_address: string;
  rent_amount: number;
  dgr_amount: number;
  water_amount: number;
  epec_amount: number;
  municipal_amount: number;
  expenses_amount: number;
  various_amount: number;
  previous_balance: number;
};

export type BankAccountsTable = {
  id: string;
  name: string;
  owner: string;
  bank: string;
  cbu_number: string;
  alias: string;
};

export type BankAccountForm = {
  id: string;
  name: string;
  owner: string;
  bank: string;
  cbu_number: string;
  alias: string;
};

export type AllReceiptsTable = {
  id: string;
  property_id: string;
  name: string;
  rental_period_start: string;
  rental_period_end: string;
  total_amount: number;
  isallpaid: boolean;
};
