'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const PropertyFormSchema = z.object({
    id: z.string(),
    name: z.string({ invalid_type_error: 'Ingrese un nombre válido' }),
    street_name: z.string(),
    street_number: z.string(),
    floor_number: z.string(),
    apartment_number: z.string(),
    city: z.string(),
    dgr_code: z.string(),
    municipal_code: z.string(),
    epec_client_number: z.string(),
    epec_contract_number: z.string(),
    water_contract_number: z.string(),
    landlord_name: z.string(),
    tenant_name: z.string(),
    tenant_cuit_cuil: z.string(),
    contact_person_name: z.string(),
    contact_person_phone: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    adjustment_frequency_id: z.coerce.number().gt(0, { message: 'Seleccione una frecuencia de ajuste' }),
    monthly_rent: z.coerce.number().gt(0, { message: 'Ingrese un monto de alquiler mayor a cero' }),
    bank_account_id: z.string().nullable(),
    comments: z.string(),
});

const CreateProperty = PropertyFormSchema.omit({ id: true, city: true });

export async function createProperty(prevState: PropertyState, formData: FormData) {
    const validatedFields = CreateProperty.safeParse({
        name: formData.get('name'),
        street_name: formData.get('street_name'),
        street_number: formData.get('street_number'),
        floor_number: formData.get('floor_number'),
        apartment_number: formData.get('apartment_number'),
        dgr_code: formData.get('dgr_code'),
        municipal_code: formData.get('municipal_code'),
        epec_client_number: formData.get('epec_client_number'),
        epec_contract_number: formData.get('epec_contract_number'),
        water_contract_number: formData.get('water_contract_number'),
        landlord_name: formData.get('landlord_name'),
        tenant_name: formData.get('tenant_name'),
        tenant_cuit_cuil: formData.get('tenant_cuit_cuil'),
        contact_person_name: formData.get('contact_person_name'),
        contact_person_phone: formData.get('contact_person_phone'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        adjustment_frequency_id: formData.get('adjustment_frequency_id'),
        monthly_rent: formData.get('monthly_rent'),
        bank_account_id: formData.get('bank_account_id'),
        comments: formData.get('comments'),
    });

    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. Error al crear la propiedad'
        };
    }

    const {
        name,
        street_name,
        street_number,
        floor_number,
        apartment_number,
        dgr_code,
        municipal_code,
        epec_client_number,
        epec_contract_number,
        water_contract_number,
        landlord_name,
        tenant_name,
        tenant_cuit_cuil,
        contact_person_name,
        contact_person_phone,
        start_date,
        end_date,
        adjustment_frequency_id,
        monthly_rent,
        bank_account_id,
        comments,
    } = validatedFields.data;

    const rent_amount_in_cents = monthly_rent * 100;
    const city = 'Córdoba';

    try {
        await sql`
            INSERT INTO properties (
                name,
                street_name,
                street_number,
                floor_number,
                apartment_number,
                city,
                dgr_code,
                municipal_code,
                epec_client_number,
                epec_contract_number,
                water_contract_number,
                landlord_name,
                tenant_name,
                tenant_cuit_cuil,
                contact_person_name,
                contact_person_phone,
                start_date,
                end_date,
                monthly_rent,
                adjustment_frequency_id,
                bank_account_id,
                comments
            )
            VALUES (
                ${name},
                ${street_name},
                ${street_number},
                ${floor_number},
                ${apartment_number},
                ${city},
                ${dgr_code},
                ${municipal_code},
                ${epec_client_number},
                ${epec_contract_number},
                ${water_contract_number},
                ${landlord_name},
                ${tenant_name},
                ${tenant_cuit_cuil},
                ${contact_person_name},
                ${contact_person_phone},
                ${start_date},
                ${end_date},
                ${rent_amount_in_cents},
                ${adjustment_frequency_id},
                ${bank_account_id},
                ${comments}
            )
        `;
    } catch (error) {
        return { message: 'Database error: Error al crear la propiedad' };
    }

    revalidatePath('/dashboard/properties');
    redirect('/dashboard/properties');
}

const UpdateProperty = PropertyFormSchema.omit({ id: true, city: true });

export async function updateProperty(id: string, prevState: PropertyState, formData: FormData) {
    const validatedFields = UpdateProperty.safeParse({
        name: formData.get('name'),
        street_name: formData.get('street_name'),
        street_number: formData.get('street_number'),
        floor_number: formData.get('floor_number'),
        apartment_number: formData.get('apartment_number'),
        dgr_code: formData.get('dgr_code'),
        municipal_code: formData.get('municipal_code'),
        epec_client_number: formData.get('epec_client_number'),
        epec_contract_number: formData.get('epec_contract_number'),
        water_contract_number: formData.get('water_contract_number'),
        landlord_name: formData.get('landlord_name'),
        tenant_name: formData.get('tenant_name'),
        tenant_cuit_cuil: formData.get('tenant_cuit_cuil'),
        contact_person_name: formData.get('contact_person_name'),
        contact_person_phone: formData.get('contact_person_phone'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        adjustment_frequency_id: formData.get('adjustment_frequency_id'),
        monthly_rent: formData.get('monthly_rent'),
        bank_account_id: formData.get('bank_account_id'),
        comments: formData.get('comments'),
    });

    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. Error al actualizar la propiedad'
        };
    }

    const {
        name,
        street_name,
        street_number,
        floor_number,
        apartment_number,
        dgr_code,
        municipal_code,
        epec_client_number,
        epec_contract_number,
        water_contract_number,
        landlord_name,
        tenant_name,
        tenant_cuit_cuil,
        contact_person_name,
        contact_person_phone,
        start_date,
        end_date,
        adjustment_frequency_id,
        monthly_rent,
        bank_account_id,
        comments,
    } = validatedFields.data;

    const rent_amount_in_cents = monthly_rent * 100;
    const city = 'Córdoba';

    const new_start_date = start_date === '' ? new Date().toISOString().split('T')[0] : start_date;
    const new_end_date = end_date === '' ? new Date().toISOString().split('T')[0] : end_date;

    try {
        await sql`
            UPDATE properties
            SET
                name = ${name},
                street_name = ${street_name},
                street_number = ${street_number},
                floor_number = ${floor_number},
                apartment_number = ${apartment_number},
                city = ${city},
                dgr_code = ${dgr_code},
                municipal_code = ${municipal_code},
                epec_client_number = ${epec_client_number},
                epec_contract_number = ${epec_contract_number},
                water_contract_number = ${water_contract_number},
                landlord_name = ${landlord_name},
                tenant_name = ${tenant_name},
                tenant_cuit_cuil = ${tenant_cuit_cuil},
                contact_person_name = ${contact_person_name},
                contact_person_phone = ${contact_person_phone},
                start_date = ${new_start_date},
                end_date = ${new_end_date},
                monthly_rent = ${rent_amount_in_cents},
                adjustment_frequency_id = ${adjustment_frequency_id},
                bank_account_id = ${bank_account_id},
                comments = ${comments}
            WHERE id = ${id}
        `;

    } catch (error) {
        return { message: 'Database error: Error al editar la propiedad' };
    }

    revalidatePath('/dashboard/properties');
    redirect('/dashboard/properties');
}

export async function deleteProperty(id: string) {
    try {
        await sql`DELETE FROM properties WHERE id = ${id}`;
        revalidatePath('/dashboard/properties');
        return { message: 'Propiedad eliminada' };
    } catch (error) {
        return { message: 'Database error: Error al eliminar la propiedad' };
    }
}

export type PropertyState = {
    errors?: {
        name?: string[];
        street_name?: string[];
        street_number?: string[];
        floor_number?: string[];
        apartment_number?: string[];
        dgr_code?: string[];
        municipal_code?: string[];
        epec_client_number?: string[];
        epec_contract_number?: string[];
        water_contract_number?: string[];
        landlord_name?: string[];
        tenant_name?: string[];
        tenant_cuit_cuil?: string[];
        contact_person_name?: string[];
        contact_person_phone?: string[];
        start_date?: string[];
        end_date?: string[];
        adjustment_frequency_id?: string[];
        monthly_rent?: string[];
        comments?: string[];
    };
    message?: string | null;
}

export type ReceiptState = {
    errors?: {
        tenant_name?: string[];
        rental_period_start?: string[];
        rental_period_end?: string[];
        property_address?: string[];
        rent_amount?: string[];
        rent_paid?: string[];
        dgr_amount?: string[];
        dgr_paid?: string[];
        water_amount?: string[];
        water_paid?: string[];
        epec_amount?: string[];
        epec_paid?: string[];
        municipal_amount?: string[];
        municipal_paid?: string[];
        expenses_amount?: string[];
        expenses_paid?: string[];
        various_amount?: string[];
        various_paid?: string[];
        previous_balance?: string[];
        previous_balance_paid?: string[];
        total_amount?: string[];
    };
    message?: string | null;
}

export async function authenticate(prevState: string | undefined, formData: FormData) {

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales inválidas';
                default:
                    return 'Algo salió mal';
            }
        }
        throw error
    }
}

const ReceiptFormSchema = z.object({
    id: z.string(),
    property_id: z.string(),
    tenant_name: z.string(),
    rental_period_start: z.string(),
    rental_period_end: z.string(),
    property_address: z.string(),
    rent_amount: z.coerce.number().gte(0),
    rent_paid: z.boolean(),
    dgr_amount: z.coerce.number().gte(0),
    dgr_paid: z.boolean(),
    water_amount: z.coerce.number().gte(0),
    water_paid: z.boolean(),
    epec_amount: z.coerce.number().gte(0),
    epec_paid: z.boolean(),
    municipal_amount: z.coerce.number().gte(0),
    municipal_paid: z.boolean(),
    expenses_amount: z.coerce.number().gte(0),
    expenses_paid: z.boolean(),
    various_amount: z.coerce.number(),
    various_paid: z.boolean(),
    previous_balance: z.coerce.number(),
    previous_balance_paid: z.boolean(),
    total_amount: z.coerce.number(),
});

const CreateReceipt = ReceiptFormSchema.omit({ id: true });

export async function createReceiptFromProperty(propertyId: string, prevState: PropertyState, formData: FormData) {
    const validatedFields = CreateReceipt.safeParse({
        property_id: propertyId,
        tenant_name: formData.get('tenant_name'),
        rental_period_start: formData.get('rental_period_start'),
        rental_period_end: formData.get('rental_period_end'),
        property_address: formData.get('property_address'),
        rent_amount: formData.get('rent_amount'),
        rent_paid: formData.get('rent_paid') === 'true',
        dgr_amount: formData.get('dgr_amount'),
        dgr_paid: formData.get('dgr_paid') === 'true',
        water_amount: formData.get('water_amount'),
        water_paid: formData.get('water_paid') === 'true',
        epec_amount: formData.get('epec_amount'),
        epec_paid: formData.get('epec_paid') === 'true',
        municipal_amount: formData.get('municipal_amount'),
        municipal_paid: formData.get('municipal_paid') === 'true',
        expenses_amount: formData.get('expenses_amount'),
        expenses_paid: formData.get('expenses_paid') === 'true',
        various_amount: formData.get('various_amount'),
        various_paid: formData.get('various_paid') === 'true',
        previous_balance: formData.get('previous_balance'),
        previous_balance_paid: formData.get('previous_balance_paid') === 'true',
        total_amount: formData.get('total_amount'),
    });
    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. Error al crear el recibo'
        };
    }

    const {
        tenant_name,
        rental_period_start,
        rental_period_end,
        property_address,
        rent_amount,
        rent_paid,
        dgr_amount,
        dgr_paid,
        water_amount,
        water_paid,
        epec_amount,
        epec_paid,
        municipal_amount,
        municipal_paid,
        expenses_amount,
        expenses_paid,
        various_amount,
        various_paid,
        previous_balance,
        previous_balance_paid,
        total_amount,
    } = validatedFields.data;

    const rent_amount_in_cents = rent_amount * 100;
    const dgr_amount_in_cents = dgr_amount * 100;
    const water_amount_in_cents = water_amount * 100;
    const epec_amount_in_cents = epec_amount * 100;
    const municipal_amount_in_cents = municipal_amount * 100;
    const expenses_amount_in_cents = expenses_amount * 100;
    const various_amount_in_cents = various_amount * 100;
    const previous_balance_in_cents = previous_balance * 100;
    const total_amount_in_cents = rent_amount_in_cents + dgr_amount_in_cents + water_amount_in_cents + epec_amount_in_cents + municipal_amount_in_cents + expenses_amount_in_cents + various_amount_in_cents + previous_balance_in_cents;

    try {
        await sql`
            INSERT INTO rentreceipts (
                property_id,
                tenant_name,
                rental_period_start,
                rental_period_end,
                property_address,
                rent_amount,
                rent_paid,
                dgr_amount,
                dgr_paid,
                water_amount,
                water_paid,
                epec_amount,
                epec_paid,
                municipal_amount,
                municipal_paid,
                expenses_amount,
                expenses_paid,
                various_amount,
                various_paid,
                previous_balance,
                previous_balance_paid,
                total_amount
            )
            VALUES (
                ${propertyId},
                ${tenant_name},
                ${rental_period_start},
                ${rental_period_end},
                ${property_address},
                ${rent_amount_in_cents},
                ${rent_paid},
                ${dgr_amount_in_cents},
                ${dgr_paid},
                ${water_amount_in_cents},
                ${water_paid},
                ${epec_amount_in_cents},
                ${epec_paid},
                ${municipal_amount_in_cents},
                ${municipal_paid},
                ${expenses_amount_in_cents},
                ${expenses_paid},
                ${various_amount_in_cents},
                ${various_paid},
                ${previous_balance_in_cents},
                ${previous_balance_paid},
                ${total_amount_in_cents}
            )
        `;
    }
    catch (error) {
        return { message: 'Database error: Error al crear el recibo' };
    }

    revalidatePath(`/dashboard/properties/${propertyId}/receipts`);
    redirect(`/dashboard/properties/${propertyId}/receipts`);
}

export async function deleteReceipt(id: string, propertyId: string) {
    try {
        await sql`DELETE FROM rentreceipts WHERE id = ${id}`;
        revalidatePath(`/dashboard/properties/${propertyId}/receipts`);
        return { message: 'Recibo eliminado' };
    } catch (error) {
        return { message: 'Database error: Error al eliminar el recibo' };
    }
}

const UpdateReceipt = ReceiptFormSchema.omit({ id: true });

export async function updateReceipt(id: string, prevState: PropertyState, formData: FormData) {
    const validatedFields = UpdateReceipt.safeParse({
        property_id: formData.get('property_id'),
        tenant_name: formData.get('tenant_name'),
        rental_period_start: formData.get('rental_period_start'),
        rental_period_end: formData.get('rental_period_end'),
        property_address: formData.get('property_address'),
        rent_amount: formData.get('rent_amount'),
        rent_paid: formData.get('rent_paid') === 'true',
        dgr_amount: formData.get('dgr_amount'),
        dgr_paid: formData.get('dgr_paid') === 'true',
        water_amount: formData.get('water_amount'),
        water_paid: formData.get('water_paid') === 'true',
        epec_amount: formData.get('epec_amount'),
        epec_paid: formData.get('epec_paid') === 'true',
        municipal_amount: formData.get('municipal_amount'),
        municipal_paid: formData.get('municipal_paid') === 'true',
        expenses_amount: formData.get('expenses_amount'),
        expenses_paid: formData.get('expenses_paid') === 'true',
        various_amount: formData.get('various_amount'),
        various_paid: formData.get('various_paid') === 'true',
        previous_balance: formData.get('previous_balance'),
        previous_balance_paid: formData.get('previous_balance_paid') === 'true',
        total_amount: formData.get('total_amount'),
    });

    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. Error al actualizar el recibo'
        };
    }

    const {
        property_id,
        tenant_name,
        rental_period_start,
        rental_period_end,
        property_address,
        rent_amount,
        rent_paid,
        dgr_amount,
        dgr_paid,
        water_amount,
        water_paid,
        epec_amount,
        epec_paid,
        municipal_amount,
        municipal_paid,
        expenses_amount,
        expenses_paid,
        various_amount,
        various_paid,
        previous_balance,
        previous_balance_paid,
        total_amount,
    } = validatedFields.data;

    const rent_amount_in_cents = rent_amount * 100;
    const dgr_amount_in_cents = dgr_amount * 100;
    const water_amount_in_cents = water_amount * 100;
    const epec_amount_in_cents = epec_amount * 100;
    const municipal_amount_in_cents = municipal_amount * 100;
    const expenses_amount_in_cents = expenses_amount * 100;
    const various_amount_in_cents = various_amount * 100;
    const previous_balance_in_cents = previous_balance * 100;
    const total_amount_in_cents = rent_amount_in_cents + dgr_amount_in_cents + water_amount_in_cents + epec_amount_in_cents + municipal_amount_in_cents + expenses_amount_in_cents + various_amount_in_cents + previous_balance_in_cents;

    const new_start_date = rental_period_start === '' ? new Date().toISOString().split('T')[0] : rental_period_start;
    const new_end_date = rental_period_end === '' ? new Date().toISOString().split('T')[0] : rental_period_end;

    try {
        await sql`
            UPDATE rentreceipts
            SET
                property_id = ${property_id},
                tenant_name = ${tenant_name},
                rental_period_start = ${new_start_date},
                rental_period_end = ${new_end_date},
                property_address = ${property_address},
                rent_amount = ${rent_amount_in_cents},
                rent_paid = ${rent_paid},
                dgr_amount = ${dgr_amount_in_cents},
                dgr_paid = ${dgr_paid},
                water_amount = ${water_amount_in_cents},
                water_paid = ${water_paid},
                epec_amount = ${epec_amount_in_cents},
                epec_paid = ${epec_paid},
                municipal_amount = ${municipal_amount_in_cents},
                municipal_paid = ${municipal_paid},
                expenses_amount = ${expenses_amount_in_cents},
                expenses_paid = ${expenses_paid},
                various_amount = ${various_amount_in_cents},
                various_paid = ${various_paid},
                previous_balance = ${previous_balance_in_cents},
                previous_balance_paid = ${previous_balance_paid},
                total_amount = ${total_amount_in_cents}
            WHERE id = ${id}
        `;

    } catch (error) {
        return { message: 'Database error: Error al editar el recibo' };
    }

    revalidatePath(`/dashboard/properties/${property_id}/receipts`);
    redirect(`/dashboard/properties/${property_id}/receipts`);
}

export async function deleteBankAccount(id: string) {
    try {
        await sql`DELETE FROM bankaccounts WHERE id = ${id}`;
        revalidatePath('/dashboard/bankaccounts');
        return { message: 'Cuenta eliminada' };
    } catch (error) {
        return { message: 'Database error: Error al eliminar la cuenta' };
    }
}

const BankAccountFormSchema = z.object({
    id: z.string(),
    name: z.string({ invalid_type_error: 'Ingrese un nombre válido' }),
    bank: z.string(),
    owner: z.string(),
    cbu_number: z.string(),
    alias: z.string(),
});

const CreateBankAccount = BankAccountFormSchema.omit({ id: true });

export async function createBankAccount(prevState: BankAccountState, formData: FormData) {
    const validatedFields = CreateBankAccount.safeParse({
        name: formData.get('name'),
        bank: formData.get('bank'),
        owner: formData.get('owner'),
        cbu_number: formData.get('cbu_number'),
        alias: formData.get('alias'),
    });

    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. Error al crear la cuenta de banco'
        };
    }

    const {
        name,
        bank,
        owner,
        cbu_number,
        alias,
    } = validatedFields.data;

    try {
        await sql`
            INSERT INTO bankaccounts (
                name,
                bank,
                owner,
                cbu_number,
                alias
            )
            VALUES (
                ${name},
                ${bank},
                ${owner},
                ${cbu_number},
                ${alias}
            )
        `;
    } catch (error) {
        return { message: 'Database error: Error al crear la cuenta de banco' };
    }

    revalidatePath('/dashboard/bankaccounts');
    redirect('/dashboard/bankaccounts');
}

export type BankAccountState = {
    errors?: {
        name?: string[];
        bank?: string[];
        owner?: string[];
        cbu_number?: string[];
        alias?: string[];
    };
    message?: string | null;
}

const UpdateBankAccount = BankAccountFormSchema.omit({ id: true });

export async function updateBankAccount(id: string, prevState: BankAccountState, formData: FormData) {
    const validatedFields = UpdateBankAccount.safeParse({
        name: formData.get('name'),
        bank: formData.get('bank'),
        owner: formData.get('owner'),
        cbu_number: formData.get('cbu_number'),
        alias: formData.get('alias'),
    });

    if (!validatedFields.success) {
        return { 
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. Error al actualizar la cuenta bancaria'
        };
    }

    const {
        name,
        bank,
        owner,
        cbu_number,
        alias,
    } = validatedFields.data;

    try {
        await sql`
            UPDATE bankaccounts
            SET
                name = ${name},
                bank = ${bank},
                owner = ${owner},
                cbu_number = ${cbu_number},
                alias = ${alias}
            WHERE id = ${id}
        `;

    } catch (error) {
        return { message: 'Database error: Error al editar la cuenta' };
    }

    revalidatePath('/dashboard/bankaccounts');
    redirect('/dashboard/bankaccounts');
}

export async function deleteReceiptFromAllReceiptsPage(id: string) {
    try {
        await sql`DELETE FROM rentreceipts WHERE id = ${id}`;
        revalidatePath(`/dashboard/receipts`);
        return { message: 'Recibo eliminado' };
    } catch (error) {
        return { message: 'Database error: Error al eliminar el recibo' };
    }
}
