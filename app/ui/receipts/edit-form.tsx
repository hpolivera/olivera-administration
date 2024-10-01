'use client';

import { BankAccountForm, PropertyForm, ReceiptForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  HomeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ReceiptState, updateReceipt } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import Toggle from '../toggle';
import jsPDF from 'jspdf';
import { formatDateToDayMonthYear, formatYearMonth } from '@/app/lib/utils';

export default function Form({ receipt, property, bankAccount }: { receipt: ReceiptForm, property: PropertyForm, bankAccount: BankAccountForm }) {
  const updateReceiptWithId = updateReceipt.bind(null, receipt.id);
  
  const initialState: ReceiptState = { errors: {}, message: null };
  const [state, formAction] = useActionState(updateReceiptWithId, initialState);

  // Define el estado para los montos
  const [rentAmount, setRentAmount] = useState(receipt.rent_amount || 0);
  const [dgrAmount, setDgrAmount] = useState(receipt.dgr_amount || 0);
  const [waterAmount, setWaterAmount] = useState(receipt.water_amount || 0);
  const [epecAmount, setEpecAmount] = useState(receipt.epec_amount || 0);
  const [municipalAmount, setMunicipalAmount] = useState(receipt.municipal_amount || 0);
  const [expensesAmount, setExpensesAmount] = useState(receipt.expenses_amount || 0);
  const [variousAmount, setVariousAmount] = useState(receipt.various_amount || 0);
  const [previousBalance, setPreviousBalance] = useState(receipt.previous_balance || 0);

  // Calcula el total cada vez que un monto cambia
  const totalAmount = rentAmount + dgrAmount + waterAmount + epecAmount + municipalAmount + expensesAmount + variousAmount + previousBalance;

  const printReceipt = async () => {
    const doc = new jsPDF();
    const leftMargin = 20;
    let verticalPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    const title = "Recibo de alquiler mensual";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, verticalPosition);
    verticalPosition += 10;

    // Definir el tamaño de las celdas
    const cellHeight = 10;
    const labelWidth = 50; // Ancho para las etiquetas
    const valueWidth = 100; // Ancho para los valores
    const boxPadding = 2;   // Padding dentro de las celdas

    // Definir los tipos de parámetros en TypeScript
    const drawCell = (label: string, value: string, verticalPosition: number) => {
        doc.setFontSize(12);
        
        // Dibujar celda para la etiqueta
        doc.rect(leftMargin, verticalPosition, labelWidth, cellHeight);
        doc.setFont("helvetica", "bold");
        doc.text(label, leftMargin + boxPadding, verticalPosition + 7); // Centrado verticalmente dentro de la celda
        
        // Dibujar celda para el valor
        doc.rect(leftMargin + labelWidth, verticalPosition, valueWidth, cellHeight);
        doc.setFont("helvetica", "normal");
        doc.text(value, leftMargin + labelWidth + boxPadding, verticalPosition + 7); // Centrado verticalmente dentro de la celda
    };

    drawCell("Inquilino: ", receipt.tenant_name, verticalPosition);
    verticalPosition += cellHeight;

    drawCell("Periodo: ", `${formatDateToDayMonthYear(receipt.rental_period_start)} - ${formatDateToDayMonthYear(receipt.rental_period_end)}`, verticalPosition);
    verticalPosition += cellHeight;

    drawCell("Dirección: ", receipt.property_address, verticalPosition);
    verticalPosition += cellHeight + 15; // Añadir espacio extra antes del siguiente bloque

    // Título para la sección de Detalle
    doc.setFontSize(16);
    const detailTitle = "Detalle";
    const detailTitleWidth = doc.getTextWidth(detailTitle);
    const detailTitleX = (pageWidth - detailTitleWidth) / 2;
    doc.text(detailTitle, detailTitleX, verticalPosition);
    verticalPosition += 10;

    // Dibujar el segundo bloque de celdas para los detalles de la renta
    const items = [
        receipt.rent_amount ? { label: "Alquiler: ", value: `$${receipt.rent_amount}` } : null,
        receipt.expenses_amount ? { label: "Expensas: ", value: `$${receipt.expenses_amount}` } : null,
        receipt.water_amount ? { label: "Aguas: ", value: `$${receipt.water_amount}` } : null,
        receipt.municipal_amount ? { label: "Municipalidad: ", value: `$${receipt.municipal_amount}` } : null,
        receipt.dgr_amount ? { label: "DGR: ", value: `$${receipt.dgr_amount}` } : null,
        receipt.epec_amount ? { label: "EPEC: ", value: `$${receipt.epec_amount}` } : null,
        receipt.various_amount ? { label: "Varios: ", value: `$${receipt.various_amount}` } : null,
        receipt.previous_balance ? { label: "Balance previo: ", value: `$${receipt.previous_balance}` } : null
    ].filter(item => item !== null); // Filtrar items que no existen

    // Dibujar cada par de etiqueta/valor como una fila de celdas
    items.forEach((item) => {
        drawCell(item!.label, item!.value, verticalPosition);
        verticalPosition += cellHeight;
    });

    // Dibujar la fila para el total
    const totalAmount = receipt.rent_amount + (receipt.expenses_amount || 0) + (receipt.water_amount || 0) +
                        (receipt.municipal_amount || 0) + (receipt.dgr_amount || 0) +
                        (receipt.epec_amount || 0) + (receipt.various_amount || 0) + (receipt.previous_balance || 0);

    drawCell("Total: ", `$${totalAmount}`, verticalPosition);

    verticalPosition += cellHeight + 15;

    if (bankAccount) {
        // Título para la sección de Cuenta Bancaria
        doc.setFontSize(16);
        const bankAccountTitle = "Datos bancarios para transferencia";
        const bankAccountTitleWidth = doc.getTextWidth(bankAccountTitle);
        const bankAccountTitleX = (pageWidth - bankAccountTitleWidth) / 2;
        doc.text(bankAccountTitle, bankAccountTitleX, verticalPosition);
        verticalPosition += 10;

        // Datos de la cuenta bancaria
        const drawBankAccountCell = (label: string, value: string, verticalPosition: number) => {
          doc.setFontSize(12);
          
          // Dibujar celda para la etiqueta
          doc.rect(leftMargin, verticalPosition, labelWidth, cellHeight);
          doc.setFont("helvetica", "bold");
          doc.text(label, leftMargin + boxPadding, verticalPosition + 7); // Centrado verticalmente dentro de la celda
          
          // Dibujar celda para el valor
          doc.rect(leftMargin + labelWidth, verticalPosition, valueWidth, cellHeight);
          doc.setFont("helvetica", "normal");
          doc.text(value, leftMargin + labelWidth + boxPadding, verticalPosition + 7); // Centrado verticalmente dentro de la celda
    };

    drawBankAccountCell("Titular de cuenta: ", bankAccount.owner, verticalPosition);
    verticalPosition += cellHeight;

    drawBankAccountCell("Banco: ", bankAccount.bank, verticalPosition);
    verticalPosition += cellHeight;

    drawBankAccountCell("CBU: ", bankAccount.cbu_number, verticalPosition);
    verticalPosition += cellHeight;

    drawBankAccountCell("Alias: ", bankAccount.alias, verticalPosition);
    verticalPosition += cellHeight;
  }

    // Guardar el archivo PDF
    doc.save(`${property.name}-rec-${formatYearMonth(receipt.rental_period_start)}.pdf`);
  };

  return (
    <form action={formAction}>
        <input type="hidden" name="property_id" value={receipt.property_id} />
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
                defaultValue={receipt.tenant_name}
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
                    defaultValue={receipt.rental_period_start}
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
                    defaultValue={receipt.rental_period_end}
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
                        required
                        defaultValue={receipt.property_address}
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
                      defaultValue={receipt.rent_amount}
                      onChange={(e) => setRentAmount(Number(e.target.value) || 0)}
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                  <div className="relative w-auto">
                    <Toggle labelOff="" labelOn="" initialState={receipt.rent_paid} inputName="rent_paid" />
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
                            defaultValue={receipt.dgr_amount}
                            placeholder="Monto DGR"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            onChange={(e) => setDgrAmount(Number(e.target.value) || 0)}
                        />
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div className="relative w-auto">
                        <Toggle labelOff="" labelOn="" initialState={receipt.dgr_paid} inputName="dgr_paid" />
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
                              defaultValue={receipt.water_amount}
                              placeholder="Monto de Aguas"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setWaterAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={receipt.water_paid} inputName="water_paid" />
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
                              defaultValue={receipt.epec_amount}
                              placeholder="Monto de electricidad"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setEpecAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={receipt.epec_paid} inputName="epec_paid" />
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
                              defaultValue={receipt.municipal_amount}
                              placeholder="Monto de municipalidad"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setMunicipalAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={receipt.municipal_paid} inputName="municipal_paid" />
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
                              defaultValue={receipt.expenses_amount}
                              placeholder="Monto de expensas"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setExpensesAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={receipt.expenses_paid} inputName="expenses_paid" />
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
                              defaultValue={receipt.various_amount}
                              placeholder="Monto de varios"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setVariousAmount(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={receipt.various_paid} inputName="various_paid" />
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
                              defaultValue={receipt.previous_balance}
                              placeholder="Monto de alquiler"
                              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                              onChange={(e) => setPreviousBalance(Number(e.target.value) || 0)}
                          />
                          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                      <div className="relative w-auto">
                          <Toggle labelOff="" labelOn="" initialState={receipt.previous_balance_paid} inputName="previous_balance_paid" />
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
        <Button type="button" onClick={printReceipt}>PDF</Button>
        <Link
          href={`/dashboard/properties/${receipt.property_id}/receipts`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Recibo</Button>
      </div>
    </form>
  );
}
