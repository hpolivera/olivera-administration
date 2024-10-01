import Form from '@/app/ui/bankaccounts/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchAdjustmentFrequencies } from '@/app/lib/data';
 
export default async function Page() {
  const frequencies = await fetchAdjustmentFrequencies();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cuentas bancarias', href: '/dashboard/bankaccounts' },
          {
            label: 'Crear Cuenta Bancaria',
            href: '/dashboard/bankaccounts/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
