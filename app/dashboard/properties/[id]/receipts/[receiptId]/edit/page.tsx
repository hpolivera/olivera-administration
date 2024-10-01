import Form from '@/app/ui/receipts/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchReceiptById, fetchPropertyById, fetchBankAccountById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { clsx } from 'clsx';
import { lusitana } from '@/app/ui/fonts';

 
export default async function Page({ params }: { params: { receiptId: string } }) {

    const receipt = await fetchReceiptById(params.receiptId);
    if (!receipt) {
        notFound();
    }
    const property = await fetchPropertyById(receipt.property_id);
    const bankAccount = await fetchBankAccountById(property.bank_account_id);

    // Modify the receipt start_date and end_date to be a string
    receipt.rental_period_start = new Date(receipt.rental_period_start).toISOString().split('T')[0];
    receipt.rental_period_end = new Date(receipt.rental_period_end).toISOString().split('T')[0];

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
                { label: `Propiedades`, href: `/dashboard/properties/` },
                { label: 'Recibos', href: `/dashboard/properties/${receipt.property_id}/receipts` },
                {
                    label: 'Editar Recibo',
                    href: `/dashboard/properties/${receipt.property_id}/receipts/${receipt.id}/edit`,
                    active: true,
                },
            ]}
        />
        <div>
            <h1 className={clsx(lusitana.className,"text-3xl mb-5")}>{property.name}</h1>
        </div>
        <Form receipt={receipt} property={property} bankAccount={bankAccount} />
        </main>
    );
}
