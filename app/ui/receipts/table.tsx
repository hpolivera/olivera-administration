import { UpdateReceipt, DeleteReceipt } from './buttons';
import { formatCurrency, formatMonthYear } from '@/app/lib/utils';
import { fetchReceiptsFromProperty } from '@/app/lib/data';

export default async function ReceiptsTable({
  propertyId,
}: {
  propertyId: string;
}) {
  const receipts = await fetchReceiptsFromProperty(propertyId);

  return (
    // if receipts is empty, show a message indicating that there are no receipts for this property
    receipts.length === 0 ? (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-lg text-gray-600">No hay recibos para esta propiedad</p>
      </div>
    ) : (
      // if receipts is not empty, show the receipts in a table
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {receipts?.map((receipt) => (
              <div
                key={receipt.id}
                className={`mb-2 w-full rounded-md p-4 ${receipt.isallpaid ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <div className="flex items-center justify-between border-b pb-4">
                    <div className="mb-2 flex items-center">
                      <p>{formatMonthYear(receipt.rental_period_start)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(receipt.total_amount)}
                    </p>
                    <p className="text-xl font-medium">
                      {receipt.isallpaid}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateReceipt id={receipt.id} propertyId={propertyId} />
                    <DeleteReceipt id={receipt.id} propertyId={propertyId} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Monto total
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Pagado
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {receipts?.map((receipt) => (
                <tr
                  key={receipt.id}
                  className={`w-full border-b py-3 text-sm last-of-type:border-none 
                    [&:first-child>td:first-child]:rounded-tl-lg 
                    [&:first-child>td:last-child]:rounded-tr-lg 
                    [&:last-child>td:first-child]:rounded-bl-lg 
                    [&:last-child>td:last-child]:rounded-br-lg 
                    ${receipt.isallpaid === true ? 'bg-green-100' : 'bg-red-100'}`}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{formatMonthYear(receipt.rental_period_start)}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(receipt.total_amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {receipt.isallpaid ? 'Sí' : 'No'}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateReceipt id={receipt.id} propertyId={propertyId} />
                      <DeleteReceipt id={receipt.id} propertyId={propertyId} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ));
}
