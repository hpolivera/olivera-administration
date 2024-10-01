import Table from '@/app/ui/bankaccounts/table';
import { CreateBankAccount } from '@/app/ui/bankaccounts/buttons';
import { lusitana } from '@/app/ui/fonts';
import { BankAccountsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 
export default async function Page() {

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Cuentas</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateBankAccount />
      </div>
       <Suspense fallback={<BankAccountsTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}