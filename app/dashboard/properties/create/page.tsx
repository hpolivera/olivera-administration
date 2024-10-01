import Form from '@/app/ui/properties/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchAdjustmentFrequencies, fetchBankAccounts } from '@/app/lib/data';
 
export default async function Page() {
  const frequencies = await fetchAdjustmentFrequencies();
  const bankAccounts = await fetchBankAccounts();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Propiedades', href: '/dashboard/properties' },
          {
            label: 'Crear Propiedad',
            href: '/dashboard/properties/create',
            active: true,
          },
        ]}
      />
      <Form frequencies={frequencies} bankAccounts={bankAccounts} />
    </main>
  );
}
