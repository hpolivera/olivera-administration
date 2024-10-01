import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteReceipt, deleteReceiptFromAllReceiptsPage } from '@/app/lib/actions';


export function CreateReceipt({ propertyId }: { propertyId: string }) {
  return (
    <Link
      href={`/dashboard/properties/${propertyId}/receipts/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span>Crear recibo</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateReceipt({ id, propertyId }: { id: string, propertyId: string }) {
  return (
    <Link
      href={`/dashboard/properties/${propertyId}/receipts/${id}/edit`}
      className="rounded-md border p-2 bg-gray-100 hover:bg-blue-300"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteReceipt({ id, propertyId }: { id: string, propertyId: string }) {

  const deleteReceiptWithId = deleteReceipt.bind(null, id, propertyId);

  return (
    <form action={deleteReceiptWithId}>
      <button className="rounded-md border p-2 bg-gray-100 hover:bg-red-300">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function CreateReceiptFromScratch() {
  return (
    <Link
      href={`/dashboard/receipts/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span>Crear recibo</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteReceiptFromAllReceiptsPage({ id }: { id: string }) {

  const deleteReceiptWithId = deleteReceiptFromAllReceiptsPage.bind(null, id);

  return (
    <form action={deleteReceiptWithId}>
      <button className="rounded-md border p-2 bg-gray-100 hover:bg-red-300">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
