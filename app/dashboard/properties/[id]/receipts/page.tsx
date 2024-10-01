import Table from '@/app/ui/receipts/table';
import { fetchPropertyById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { CreateReceipt } from '@/app/ui/receipts/buttons';
import { clsx } from 'clsx';
import { lusitana } from '@/app/ui/fonts';
 
export default async function Page({ params }: { params: { id: string } }) {

    const property = await fetchPropertyById(params.id);

  return (
    <main>
        <Breadcrumbs
            breadcrumbs={[
                { label: `Propiedades`, href: `/dashboard/properties/` },
                { label: 'Recibos', href: `/dashboard/properties/${property.id}/receipts`, active: true },
            ]}
        />
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <h1 className={clsx(lusitana.className,"text-3xl")}>{property.name}</h1>
            <CreateReceipt propertyId={property.id} />
        </div>
        <Table propertyId={property.id}/>
    </main>
  );
}
