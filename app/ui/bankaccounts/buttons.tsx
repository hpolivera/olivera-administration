import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteBankAccount } from '@/app/lib/actions';

export function CreateBankAccount() {
  return (
    <Link
      href="/dashboard/bankaccounts/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span>Crear cuenta</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBankAccount({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/bankaccounts/${id}/edit`}
      className="rounded-md border p-2 hover:bg-blue-300"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBankAccount({ id }: { id: string }) {

  const deleteBankAccountWithId = deleteBankAccount.bind(null, id);

  return (
    <form action={deleteBankAccountWithId}>
      <button className="rounded-md border p-2 hover:bg-red-300">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
