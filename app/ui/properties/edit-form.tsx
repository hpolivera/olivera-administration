'use client';

import { BankAccountField, FrequencyField, PropertyForm } from '@/app/lib/definitions';
import {
  Bars2Icon,
  BoltIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  ClockIcon,
  CurrencyDollarIcon,
  HashtagIcon,
  HomeIcon,
  IdentificationIcon,
  MapPinIcon,
  PhoneIcon,
  StopIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProperty, PropertyState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditPropertyForm({
  property,
  frequencies,
  bankAccounts,
}: {
    property: PropertyForm;
    frequencies: FrequencyField[];
    bankAccounts: BankAccountField[];
}) {

  const initialState: PropertyState = { errors: {}, message: null };
  const updatePropertyWithId = updateProperty.bind(null, property.id);

  const [state, formAction] = useActionState(updatePropertyWithId, initialState);

  return (
    <form action={formAction}>
        <input type="hidden" name="id" value={property.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Property Name */}
        <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre de propiedad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
                <input
                    id="name"
                    name="name"
                    type="string"
                    defaultValue={property.name}
                    placeholder="Nombre de propiedad"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                />
                <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
            <label htmlFor="street_name" className="mb-2 block text-sm font-medium">
                Ubicación
            </label>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="street_name"
                        name="street_name"
                        type="string"
                        defaultValue={property.street_name}
                        placeholder="Calle"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative lg:col-span-1">
                    <input
                        id="street_number"
                        name="street_number"
                        type="string"
                        defaultValue={property.street_number}
                        placeholder="Número"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                    />
                    <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative lg:col-span-1">
                    <input
                        id="floor_number"
                        name="floor_number"
                        type="string"
                        defaultValue={property.floor_number}
                        placeholder="Piso"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <StopIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative lg:col-span-1">
                    <input
                        id="apartment_number"
                        name="apartment_number"
                        type="string"
                        defaultValue={property.apartment_number}
                        placeholder="Departamento"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <StopIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>

        {/* Codigo DGR */}
        <div className="mb-4">
          <label htmlFor="dgr_code" className="mb-2 block text-sm font-medium">
            Dirección General de Rentas
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="dgr_code"
                name="dgr_code"
                type="string"
                defaultValue={property.dgr_code}
                placeholder="Código DGR"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Codigo Municipal */}
        <div className="mb-4">
          <label htmlFor="municipal_code" className="mb-2 block text-sm font-medium">
            Municipalidad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="municipal_code"
                name="municipal_code"
                type="string"
                defaultValue={property.municipal_code}
                placeholder="Número de inmueble"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Epec */}
        <div className="mb-4">
          <label htmlFor="epec_client_number" className="mb-2 block text-sm font-medium">
            Epec
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                    <input
                        id="epec_client_number"
                        name="epec_client_number"
                        type="string"
                        defaultValue={property.epec_client_number}
                        placeholder="Número de cliente"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative">
                    <input
                        id="epec_contract_number"
                        name="epec_contract_number"
                        type="string"
                        defaultValue={property.epec_contract_number}
                        placeholder="Número de contrato"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <BoltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>

        {/* Aguas */}
        <div className="mb-4">
          <label htmlFor="water_contract_number" className="mb-2 block text-sm font-medium">
            Aguas
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="water_contract_number"
                name="water_contract_number"
                type="string"
                defaultValue={property.water_contract_number}
                placeholder="Número de contrato"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Landlord */}
        <div className="mb-4">
          <label htmlFor="landlord_name" className="mb-2 block text-sm font-medium">
            Locador
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="landlord_name"
                name="landlord_name"
                type="string"
                defaultValue={property.landlord_name}
                placeholder="Nombre de locador"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Tenant */}
        <div className="mb-4">
          <label htmlFor="tenantName" className="mb-2 block text-sm font-medium">
            Inquilino
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                    <input
                        id="tenant_name"
                        name="tenant_name"
                        type="string"
                        defaultValue={property.tenant_name}
                        placeholder="Nombre de inquilino"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative">
                    <input
                        id="tenant_cuit_cuil"
                        name="tenant_cuit_cuil"
                        type="string"
                        defaultValue={property.tenant_cuit_cuil}
                        placeholder="CUIL-CUIT"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative">
                    <input
                        id="contact_person_name"
                        name="contact_person_name"
                        type="string"
                        defaultValue={property.contact_person_name}
                        placeholder="Persona de contacto"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>

                <div className="relative">
                    <input
                        id="contact_person_phone"
                        name="contact_person_phone"
                        type="string"
                        defaultValue={property.contact_person_phone}
                        placeholder="Celular de contacto"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>

        {/* Fechas */}
        <div className="mb-4">
            <label htmlFor="contract" className="mb-2 block text-sm font-medium">
                Contrato
            </label>
            <div className="mt-2 grid gap-2 sm:grid-cols-1 lg:grid-cols-4">
                <div className="relative lg:grid-cols-1">
                    <label htmlFor="start_date" className="mt-2 block text-sm font-medium">
                        Inicio
                    </label>
                    <input
                        id="start_date"
                        name="start_date"
                        type="date"
                        defaultValue={property.start_date}
                        placeholder="Inicio de contrato"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <CalendarIcon 
                        className="pointer-events-none absolute left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900"
                        style={{ top: '57%' }} 
                    />
                </div>
                <div className="relative lg:grid-cols-1">
                    <label htmlFor="end_date" className="mt-2 block text-sm font-medium">
                        Fin
                    </label>
                    <input
                        id="end_date"
                        name="end_date"
                        type="date"
                        defaultValue={property.end_date}
                        placeholder="Fin de contrato"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <CalendarIcon 
                        className="pointer-events-none absolute left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900"
                        style={{ top: '57%' }} 
                    />
                </div>
                <div className="relative lg:grid-cols-1">
                    <label htmlFor="adjustment_frequency_id" className="mt-2 block text-sm font-medium">
                        Actualización
                    </label>
                    <select
                    id="adjustment_frequency_id"
                    name="adjustment_frequency_id"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={property.adjustment_frequency_id}
                    aria-describedby='adjustment-frequency-id-error'
                    required
                    >
                      <option value="" disabled>
                          Frecuencia
                      </option>
                      {frequencies.map((frequency) => (
                          <option key={frequency.id} value={frequency.id}>
                          {frequency.name}
                          </option>
                      ))}
                    </select>
                    <ClockIcon 
                        className="pointer-events-none absolute left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900"
                        style={{ top: '57%' }} 
                    />
                    <div id="adjustment-frequency-id-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.adjustment_frequency_id && state.errors.adjustment_frequency_id.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}  
                  </div>
                </div>
                <div className="relative lg:grid-cols-1">
                    <label htmlFor="monthly_rent" className="mt-2 block text-sm font-medium">
                        Precio Alquiler
                    </label>
                    <input
                        id="monthly_rent"
                        name="monthly_rent"
                        type="number"
                        step="0.01"
                        defaultValue={property.monthly_rent}
                        placeholder="Precio Alquiler"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                        pattern="\d+([.,]\d{1,2})?"
                    />
                    <CurrencyDollarIcon 
                        className="pointer-events-none absolute left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900"
                        style={{ top: '57%' }} 
                    />
                    <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.monthly_rent && state.errors.monthly_rent.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}  
                  </div>
                </div>
            </div>
        </div>

        {/* Bank Account */}
        <div className="mb-4">
          <label htmlFor="bank_account_id" className="mb-2 block text-sm font-medium">
            Cuenta de banco para transferir
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="bank_account_id"
                name="bank_account_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={property.bank_account_id ?? ''}
              >
                <option value="" disabled>
                  Cuenta
                </option>
                {bankAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                ))}
              </select>
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="mb-2 block text-sm font-medium">
            Comentarios
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="comments"
                name="comments"
                type="string"
                defaultValue={property.comments}
                placeholder="Comentarios"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>

        {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/properties"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Propiedad</Button>
      </div>
    </form>
  );
}
