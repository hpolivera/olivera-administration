import Pagination from '@/app/ui/properties/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/properties/table';
import { CreateProperty } from '@/app/ui/properties/buttons';
import { lusitana } from '@/app/ui/fonts';
import { PropertiesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchPropertiesPages } from '@/app/lib/data';
 
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
    const totalPages = await fetchPropertiesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Propiedades</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar propiedades..." />
        <CreateProperty />
      </div>
       <Suspense key={query + currentPage} fallback={<PropertiesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
