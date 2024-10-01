import Pagination from '@/app/ui/properties/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/receipts/all-receipts-table';
import { lusitana } from '@/app/ui/fonts';
import { AllReceiptsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchReceiptsPages } from '@/app/lib/data';
import { CreateReceiptFromScratch } from '@/app/ui/receipts/buttons';
 
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchReceiptsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Recibos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar recibos por nombre de propiedad o mes" />
        {/* <CreateReceiptFromScratch /> */}
      </div>
       <Suspense key={query + currentPage} fallback={<AllReceiptsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
