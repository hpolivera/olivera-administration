import { DocumentTextIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteProperty } from '@/app/lib/actions';

export function CreateProperty() {
  return (
    <Link
      href="/dashboard/properties/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear propiedad</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProperty({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/properties/${id}/edit`}
      className="rounded-md border p-2 hover:bg-blue-300"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProperty({ id }: { id: string }) {

  const deletePropertyWithId = deleteProperty.bind(null, id);

  return (
    <form action={deletePropertyWithId}>
      <button className="rounded-md border p-2 hover:bg-red-300">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function GetPropertyReceipts({ propertyId }: { propertyId: string }) {
  return (
    <Link
      href={`/dashboard/properties/${propertyId}/receipts`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <DocumentTextIcon className="w-5" />
    </Link>
  );
}
