'use client';

import { PropertyForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  HomeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createReceiptFromProperty, ReceiptState } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import Toggle from '../toggle';

export default function Form({ property }: { property: PropertyForm }) {
  const createReceiptWithId = createReceiptFromProperty.bind(null, property.id);

  
  const initialState: ReceiptState = { errors: {}, message: null };
  const [state, formAction] = useActionState(createReceiptWithId, initialState);

  // Define el estado para los montos
  const [rentAmount, setRentAmount] = useState(property.monthly_rent || 0);
  const [dgrAmount, setDgrAmount] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);
  const [epecAmount, setEpecAmount] = useState(0);
  const [municipalAmount, setMunicipalAmount] = useState(0);
  const [expensesAmount, setExpensesAmount] = useState(0);
  const [variousAmount, setVariousAmount] = useState(0);
  const [previousBalance, setPreviousBalance] = useState(0);

  // Calcula el total cada vez que un monto cambia
  const totalAmount = rentAmount + dgrAmount + waterAmount + epecAmount + municipalAmount + expensesAmount + variousAmount + previousBalance;

  return (
    <form action={formAction}>
        <input type="hidden" name="property_id" value={property.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Tenant Name */}
        <div className="mb-4">
          <label htmlFor="tenant_name" className="mb-2 block text-sm font-medium">
            Nombre de Inquilino
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tenant_name"
                name="tenant_name"
                type="string"
                placeholder="Nombre de Inquilino"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={property.tenant_name}
              />
              <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Period being checked */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Periodo
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-2">
              <div className="relative mt-2 rounded-md flex items-center space-x-2">
                <label className="text-sm font-medium w-16" htmlFor="rental_period_start">
                  Desde
                </label>
                <div className="relative w-full">
                  <input
                    id="rental_period_start"
                    name="rental_period_start"
                    type="date"
                    placeholder="Periodo de recibo"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>

              <div className="relative mt-2 rounded-md flex items-center space-x-2">
                <label className="text-sm font-medium w-16" htmlFor="rental_period_end">
                  Hasta
                </label>
                <div className="relative w-full">
                  <input
                    id="rental_period_end"
                    name="rental_period_end"
                    type="date"
                    placeholder="Periodo de recibo"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                  />
                  <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
            <label htmlFor="property_address" className="mb-2 block text-sm font-medium">
                Ubicación
            </label>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-2">
                    <input
                        id="property_address"
                        name="property_address"
                        type="string"
                        placeholder="Calle"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={`${property.street_name} ${property.street_number} - ${property.floor_number} ${property.apartment_number}`}
                    />
                    <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Rent */}
            <div>
              <label htmlFor="rent_amount" className="mb-2 block text-sm font-medium">
                Alquiler
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                <div className="relative flex items-center gap-2 lg:col-span-3">
                  <div className="relative w-full">
                    <input
                      id="rent_amount"
                      name="rent_amount"
                      type="number"
                      step="0.01"
                      placeholder="Monto de alquiler"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      defaultValue={property.monthly_rent}
                      onChange={(e) => setRentAmount(Number(e.target.value) || 0)}
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                  <div className="relative w-auto">
                    <Toggle labelOff="" labelOn="" initialState={false} inputName="rent_paid" />
                  </div>
                </div>
              </div>
                <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.rent_amount && state.errors.rent_amount.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        Ingrese un monto válido
                      </p>
                    ))}  
                </div>
            </div>

            {/* DGR */}
            <div>
              <label htmlFor="dgr_amount" className="mb-2 block text-sm font-medium">
                Direccion General de Rentas
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                <div className="relative flex items-center gap-2 lg:col-span-3">
                    <div className="relative w-full">
                        <input
                            id="dgr_amount"
                            name="dgr_amount"
                            type="number"
                            step="0.01"
                            placeholder="Monto DGR"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            onChange={(e) => setDgrAmount(Number(e.target.value) || 0)}
                        />
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div className="relative w-auto">
                        <Toggle labelOff="" labelOn="" initialState={false} inputName="dgr_paid" />
                    </div>
                </div>
              </div>
              <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.dgr_amount && state.errors.dgr_amount.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      Ingrese un monto válido
                    </p>
                  ))}  
              </div>
            </div>

            {/* Water */}
            <div>
              <label htmlFor="water_amount" className="mb-2 block text-sm font-medium">
                Aguas
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="relative flex items-center gap-2 lg:col-span-3">
                      <div className="relative w-full">
                          <input
                              id="water_amount"
                              name="water_amount"
                              type="number"
                              step="0.01"
                              placeholder="Monto de Aguas"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setWaterAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={false} inputName="water_paid" />
                      </div>
                  </div>
              </div>
              <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.water_amount && state.errors.water_amount.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      Ingrese un monto válido
                    </p>
                  ))}  
              </div>
            </div>

            {/* EPEC */}
            <div>
              <label htmlFor="epec_amount" className="mb-2 block text-sm font-medium">
                Electricidad
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="relative flex items-center gap-2 lg:col-span-3">
                      <div className="relative w-full">
                          <input
                              id="epec_amount"
                              name="epec_amount"
                              type="number"
                              step="0.01"
                              placeholder="Monto de electricidad"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setEpecAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={false} inputName="epec_paid" />
                      </div>
                  </div>
              </div>
              <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.epec_amount && state.errors.epec_amount.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      Ingrese un monto válido
                    </p>
                  ))}  
              </div>
            </div>

            {/* Municipal */}
            <div>
              <label htmlFor="municipal_amount" className="mb-2 block text-sm font-medium">
                Municipalidad
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="relative flex items-center gap-2 lg:col-span-3">
                      <div className="relative w-full">
                          <input
                              id="municipal_amount"
                              name="municipal_amount"
                              type="number"
                              step="0.01"
                              placeholder="Monto de municipalidad"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setMunicipalAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={false} inputName="municipal_paid" />
                      </div>
                  </div>
              </div>
              <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.municipal_amount && state.errors.municipal_amount.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      Ingrese un monto válido
                    </p>
                  ))}  
              </div>
            </div>

            {/* Expenses */}
            <div>
              <label htmlFor="expenses_amount" className="mb-2 block text-sm font-medium">
                Expensas
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="relative flex items-center gap-2 lg:col-span-3">
                      <div className="relative w-full">
                          <input
                              id="expenses_amount"
                              name="expenses_amount"
                              type="number"
                              step="0.01"
                              placeholder="Monto de expensas"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setExpensesAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={false} inputName="expenses_paid" />
                      </div>
                  </div>
              </div>
              <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.expenses_amount && state.errors.expenses_amount.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      Ingrese un monto válido
                    </p>
                  ))}  
              </div>
            </div>

            {/* Various */}
            <div>
              <label htmlFor="various_amount" className="mb-2 block text-sm font-medium">
                Varios
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="relative flex items-center gap-2 lg:col-span-3">
                      <div className="relative w-full">
                          <input
                              id="various_amount"
                              name="various_amount"
                              type="number"
                              step="0.01"
                              placeholder="Monto de varios"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setVariousAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={false} inputName="various_paid" />
                      </div>
                  </div>
              </div>
              <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.various_amount && state.errors.various_amount.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      Ingrese un monto válido
                    </p>
                  ))}  
              </div>
            </div>

            {/* Previous balance */}
            <div>
              <label htmlFor="previous_balance" className="mb-2 block text-sm font-medium">
                Balance previo
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="relative flex items-center gap-2 lg:col-span-3">
                      <div className="relative w-full">
                          <input
                              id="previous_balance"
                              name="previous_balance"
                              type="number"
                              step="0.01"
                              placeholder="Monto de alquiler"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setPreviousBalance(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={false} inputName="previous_balance_paid" />
                      </div>
                  </div>
              </div>
              <div id="monthly-rent-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.previous_balance && state.errors.previous_balance.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      Ingrese un monto válido
                    </p>
                  ))}  
              </div>
            </div>

            {/* Total balance */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Total
              </label>
              <div className="mt-2">
                <span className="text-lg font-semibold">$ {totalAmount.toFixed(2)}</span>
              </div>
            </div>
        </div>
      </div>

        {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/properties/${property.id}/receipts`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Recibo</Button>
      </div>
    </form>
  );
}
