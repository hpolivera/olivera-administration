import Form from '@/app/ui/receipts/create-form-with-property';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPropertyById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { clsx } from 'clsx';
import { lusitana } from '@/app/ui/fonts';

 
export default async function Page({ params }: { params: { id: string } }) {

    const property = await fetchPropertyById(params.id);
    if (!property) {
        notFound();
    }
    {clsx(lusitana.className, 'flex text-xl md:text-2xl')}

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
                { label: `Propiedades`, href: `/dashboard/properties/` },
                { label: 'Recibos', href: `/dashboard/properties/${property.id}/receipts` },
                {
                    label: 'Crear Recibo',
                    href: `/dashboard/properties/${property.id}/receipts/create`,
                    active: true,
                },
            ]}
        />
        <div>
            <h1 className={clsx(lusitana.className,"text-3xl mb-5")}>{property.name}</h1>
        </div>
        <Form property={property} />
        </main>
    );
}
