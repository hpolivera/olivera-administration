import Form from '@/app/ui/bankaccounts/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchBankAccountById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const bankAccount = await fetchBankAccountById(id);

    if (!bankAccount) {
        notFound();
    }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cuentas bancarias', href: '/dashboard/bankaccounts' },
          {
            label: 'Editar Cuentas bancarias',
            href: `/dashboard/bankaccounts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form bankAccount={bankAccount}/>
    </main>
  );
}
