import Image from 'next/image';
import { UpdateProperty, DeleteProperty, GetPropertyReceipts } from './buttons';
import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProperties } from '@/app/lib/data';

export default async function PropertiesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const properties = await fetchFilteredProperties(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {properties?.map((property) => (
              <div
                key={property.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src='/customers/evil-rabbit.png'
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={' Property picture'}
                      />
                      <p>{property.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{property.tenant_name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(property.monthly_rent)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <GetPropertyReceipts propertyId={property.id} />
                    <UpdateProperty id={property.id} />
                    <DeleteProperty id={property.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
            {properties?.length > 0 && (
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Propiedad
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Inquilino
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Alquiler
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Comentarios
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Editar</span>
                </th>
              </tr>
              </thead>
              <tbody className="bg-white">
              {properties.map((property) => (
                <tr
                key={property.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                  <Image
                    src='/customers/evil-rabbit.png'
                    className="rounded-full"
                    width={28}
                    height={28}
                    alt={'Foto de la propiedad'}
                  />
                  <p>{property.name}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 tenant-custom-max-width">
                  {property.tenant_name}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {formatCurrency(property.monthly_rent)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 comments-custom-max-width">
                  {property.comments}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                  <GetPropertyReceipts propertyId={property.id} />
                  <UpdateProperty id={property.id} />
                  <DeleteProperty id={property.id} />
                  </div>
                </td>
                </tr>
              ))}
              </tbody>
            </table>
            )}
          { properties?.length === 0 
            ? <p className="text-center text-gray-500 mt-4">No se encontraron Propiedades</p>
            : null
          }
        </div>
      </div>
    </div>
  );
}
