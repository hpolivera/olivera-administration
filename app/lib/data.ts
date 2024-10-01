import { sql } from '@vercel/postgres';
import {
  AllReceiptsTable,
  BankAccountField,
  BankAccountForm,
  BankAccountsTable,
  FrequencyField,
  PropertiesTable,
  PropertyForm,
  ReceiptForm,
} from './definitions';

export async function fetchCardData() {
  try {
    const propertiesCountPromise = sql`SELECT COUNT(*) FROM properties`;
    const pendingReceiptsCountPromise = sql`
      SELECT COUNT(*)
      FROM rentreceipts
      WHERE (rentreceipts.rent_paid AND rentreceipts.dgr_paid AND rentreceipts.water_paid AND rentreceipts.epec_paid AND 
            rentreceipts.municipal_paid AND rentreceipts.expenses_paid AND 
            rentreceipts.various_paid AND rentreceipts.previous_balance_paid) = FALSE
    `;

    const data = await Promise.all([
      propertiesCountPromise,
      pendingReceiptsCountPromise,
    ]);

    const numberOfProperties = Number(data[0].rows[0].count ?? '0');
    const numberOfPendingReceipts = Number(data[1].rows[0].count ?? '0');

    return {
      numberOfProperties,
      numberOfPendingReceipts,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchPropertyById(id: string) {
  try {
    const data = await sql<PropertyForm>`
      SELECT *
      FROM properties
      WHERE properties.id = ${id};
    `;

    const property = data.rows.map((property) => ({
      ...property,
      // Convert rent amount from cents to dollars
      monthly_rent: property.monthly_rent / 100,
    }));

    return property[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch property.');
  }
}

const PROPERTIES_PER_PAGE = 10;
export async function fetchFilteredProperties(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * PROPERTIES_PER_PAGE;

  try {
    const properties = await sql<PropertiesTable>`
      SELECT *
      FROM properties
      WHERE
        name::text ILIKE ${`%${query}%`} OR
        tenant_name::text ILIKE ${`%${query}%`}
      ORDER BY name ASC
      LIMIT ${PROPERTIES_PER_PAGE} OFFSET ${offset}
    `;

    return properties.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch properties.');
  }
}

export async function fetchPropertiesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM properties
    WHERE
      name::text ILIKE ${`%${query}%`} OR
      tenant_name::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / PROPERTIES_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of properties.');
  }
}

export async function fetchAdjustmentFrequencies() {
  try {
    const data = await sql<FrequencyField>`
      SELECT
        id,
        name
      FROM adjustmentfrequencies
    `;

    const frequencies = data.rows;
    return frequencies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all frequencies.');
  }
}

export async function fetchReceiptsFromProperty(
  propertyId: string
) {
  try {
    const receipts = await sql`
      SELECT
      rentreceipts.id,
      rentreceipts.property_id,
      rentreceipts.tenant_name,
      rentreceipts.rental_period_start,
      rentreceipts.rental_period_end,
      rentreceipts.property_address,
      rentreceipts.rent_amount,
      rentreceipts.rent_paid,
      rentreceipts.dgr_amount,
      rentreceipts.dgr_paid,
      rentreceipts.water_amount,
      rentreceipts.water_paid,
      rentreceipts.epec_amount,
      rentreceipts.epec_paid,
      rentreceipts.municipal_amount,
      rentreceipts.municipal_paid,
      rentreceipts.expenses_amount,
      rentreceipts.expenses_paid,
      rentreceipts.various_amount,
      rentreceipts.various_paid,
      rentreceipts.previous_balance,
      rentreceipts.previous_balance_paid,
      rentreceipts.total_amount,
      CASE 
        WHEN rentreceipts.rent_paid AND rentreceipts.dgr_paid AND rentreceipts.water_paid AND rentreceipts.epec_paid AND 
            rentreceipts.municipal_paid AND rentreceipts.expenses_paid AND 
            rentreceipts.various_paid AND rentreceipts.previous_balance_paid 
        THEN TRUE
        ELSE FALSE
      END AS isAllPaid
      FROM properties
      JOIN rentreceipts ON properties.id = rentreceipts.property_id
      WHERE rentreceipts.property_id = ${propertyId}
      ORDER BY rentreceipts.rental_period_start DESC      
    `;

    return receipts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch receipts from property.');
  }
}

export async function fetchReceiptById(id: string) {
  try {
    const data = await sql<ReceiptForm>`
      SELECT *
      FROM rentreceipts
      WHERE rentreceipts.id = ${id};
    `;

    const receipt = data.rows.map((receipt) => ({
      ...receipt,
      // Convert rent amount from cents to dollars
      rent_amount: receipt.rent_amount / 100,
      dgr_amount: receipt.dgr_amount / 100,
      water_amount: receipt.water_amount / 100,
      epec_amount: receipt.epec_amount / 100,
      municipal_amount: receipt.municipal_amount / 100,
      expenses_amount: receipt.expenses_amount / 100,
      various_amount: receipt.various_amount / 100,
      previous_balance: receipt.previous_balance / 100,
      total_amount: receipt.total_amount / 100,
    }));

    return receipt[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch property.');
  }
}

export async function fetchBankAccounts() {
  try {
    const data = await sql<BankAccountField>`
      SELECT
        id,
        name
      FROM bankaccounts
    `;

    const bankaccounts = data.rows;
    return bankaccounts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all bank accounts.');
  }
}

export async function fetchBankAccountById(id: string) {

  try {
    const data = await sql<BankAccountForm>`
      SELECT *
      FROM bankaccounts
      WHERE bankaccounts.id = ${id};
    `;

    const account = data.rows.map((account) => ({
      ...account,
    }));

    return account[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bank account.');
  }
}

export async function fetchBankAccountsTableInfo() {
  try {
    const bankaccounts = await sql<BankAccountsTable>`
      SELECT *
      FROM bankaccounts
      ORDER BY name ASC
    `;

    return bankaccounts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bank accounts.');
  }
}

const RECEIPTS_PER_PAGE = 10;
export async function fetchFilteredReceipts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * RECEIPTS_PER_PAGE;

  try {
    const receipts = await sql<AllReceiptsTable>`
      SELECT *
      FROM (
        SELECT 
          rentreceipts.id,
          properties.id AS property_id,
          properties.name,
          rentreceipts.rental_period_start,
          rentreceipts.rental_period_end,
          CASE 
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 1 THEN 'Enero'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 2 THEN 'Febrero'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 3 THEN 'Marzo'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 4 THEN 'Abril'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 5 THEN 'Mayo'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 6 THEN 'Junio'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 7 THEN 'Julio'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 8 THEN 'Agosto'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 9 THEN 'Septiembre'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 10 THEN 'Octubre'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 11 THEN 'Noviembre'
            WHEN EXTRACT(MONTH FROM rentreceipts.rental_period_start) = 12 THEN 'Diciembre'
          END AS mes,
          rentreceipts.total_amount,
          CASE 
            WHEN rentreceipts.rent_paid AND rentreceipts.dgr_paid AND rentreceipts.water_paid AND rentreceipts.epec_paid AND 
                rentreceipts.municipal_paid AND rentreceipts.expenses_paid AND 
                rentreceipts.various_paid AND rentreceipts.previous_balance_paid 
            THEN TRUE
            ELSE FALSE
          END AS isallpaid
        FROM properties
        JOIN rentreceipts ON properties.id = rentreceipts.property_id
      ) AS subquery
      WHERE
        subquery.name::text ILIKE ${`%${query}%`} OR
        subquery.mes::text ILIKE ${`%${query}%`}
      ORDER BY subquery.name ASC, subquery.rental_period_start DESC
      LIMIT ${RECEIPTS_PER_PAGE} OFFSET ${offset}
    `;

    return receipts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all receipts.');
  }
}

export async function fetchReceiptsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM rentreceipts
    JOIN properties ON properties.id = rentreceipts.property_id
    WHERE
      properties.name::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / RECEIPTS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of receipts.');
  }
}
