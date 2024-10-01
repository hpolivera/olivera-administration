import { UpdateBankAccount, DeleteBankAccount } from './buttons';
import { fetchBankAccountsTableInfo } from '@/app/lib/data';

export default async function BankAccountsTable() {
  const bankaccounts = await fetchBankAccountsTableInfo();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {bankaccounts?.map((account) => (
              <div
                key={account.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{account.alias}</p>
                    </div>
                    <p className="text-sm text-gray-500">{account.owner}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {account.name}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateBankAccount id={account.id} />
                    <DeleteBankAccount id={account.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table table-fixed">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Cuenta
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Titular
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Banco
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Alias
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {bankaccounts?.map((account) => (
                <tr
                  key={account.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{account.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {account.owner}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {account.bank}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {account.alias}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateBankAccount id={account.id} />
                      <DeleteBankAccount id={account.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
