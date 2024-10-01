'use client';

import Link from 'next/link';
import {
  BoltIcon,
  BuildingLibraryIcon,
  HashtagIcon,
  IdentificationIcon,
  TagIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createBankAccount, BankAccountState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
  
  const initialState: BankAccountState = { errors: {}, message: null };
  const [state, formAction] = useActionState(createBankAccount, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Account Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre de la cuenta
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Nombre de la cuenta"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name && state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}  
            </div>
          </div>
        </div>

        {/* Bank */}
        <div className="mb-4">
          <label htmlFor="bank" className="mb-2 block text-sm font-medium">
            Banco
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="bank"
                name="bank"
                type="string"
                placeholder="Nombre de banco"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Owner */}
        <div className="mb-4">
          <label htmlFor="owner" className="mb-2 block text-sm font-medium">
            Titular
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="owner"
                name="owner"
                type="string"
                placeholder="Titular de cuenta"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* CBU number */}
        <div className="mb-4">
          <label htmlFor="cbu_number" className="mb-2 block text-sm font-medium">
            CBU - CVU
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cbu_number"
                name="cbu_number"
                type="number"
                placeholder="Número CBU - CVU"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Alias */}
        <div className="mb-4">
          <label htmlFor="alias" className="mb-2 block text-sm font-medium">
            Alias
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="alias"
                name="alias"
                type="string"
                placeholder="Alias de la cuenta"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>

        {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/bankaccounts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Cuenta</Button>
      </div>
    </form>
  );
}
