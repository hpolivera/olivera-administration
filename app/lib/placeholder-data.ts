// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

import { comment } from "postcss";
import { start } from "repl";

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '8635f5ba-e871-4611-a392-f082889b3bb8',
    name: 'Hernan',
    email: 'hpolivera@gmail.com',
    password: 'Hernan5927',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const adjustment_frequencies = [
  {
    id: '1',
    name: 'Mensual',
  },
  {
    id: '2',
    name: 'Bimestral',
  },
  {
    id: '3',
    name: 'Trimestral',
  },
  {
    id: '4',
    name: 'Cuatrimestral',
  },
  {
    id: '5',
    name: 'Semestral',
  },
  {
    id: '6',
    name: 'Anual',
  },
];

const properties = [
  {
    name: 'Balbeck',
    street_name: 'Arturo Illia',
    street_number: '480',
    floor_number: '12',
    apartment_number: 'D',
    city: 'Cordoba',
    dgr_code: '110123756126',
    municipal_code: '040900800900060',
    epec_client_number: '05288482',
    epec_contract_number: '0085339006',
    water_contract_number: '573564',
    landlord_name: 'Julia Olivera',
    tenant_name: 'Pedro Armando Gutierrez',
    tenant_cuit_cuil: '20-16157322-2',
    contact_person_name: 'Pedro Armando Gutierrez',
    contact_person_phone: '3517575597',
    start_date: '2022-01-01',
    end_date: '2024-12-31',
    monthly_rent: 109350,
    adjustment_frequency_id: adjustment_frequencies[4].id,
    comments: 'Lo que se quiera poner de comentario',
  },
];

export { users, customers, invoices, revenue, adjustment_frequencies, properties };
