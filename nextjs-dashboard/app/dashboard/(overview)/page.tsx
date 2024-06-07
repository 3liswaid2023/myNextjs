import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'; 
import { lusitana } from '@/app/ui/fonts';
// import { fetchLatestInvoices } from '@/app/lib/data';the fetch is moved inside the  latest-invoices
import { fetchCardData } from '@/app/lib/data';
import {Suspense} from 'react';
import CardWrapper from '@/app/ui/dashboard/cards';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';



 
export default async function Page() {
  // const revenue = await fetchRevenue(); deleted by Ali for the chapter 9 (Streaming a component)
  // const latestInvoices=await fetchLatestInvoices(); deleted by Ali for the chapter 9 (Streaming a component)
  const totalPaidInvoices=(await fetchCardData()).totalPaidInvoices;
  const totalPendingInvoices=(await fetchCardData()).totalPendingInvoices;
  const numberOfInvoices=(await fetchCardData()).numberOfInvoices;
  const numberOfCustomers=(await fetchCardData()).numberOfCustomers;
  

  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData(); // wait for fetchLatestInvoices() to finish

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div> */}
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* { <RevenueChart revenue={revenue}  /> } deleted for the chapter 9 (Streaming a component)*/}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>        
        {/* { <LatestInvoices latestInvoices={latestInvoices} /> } deleted for chapter 9(Streaming a component)*/}
        <Suspense fallback={<LatestInvoicesSkeleton/>}>
        
        <LatestInvoices />

        </Suspense>
      </div>
    </main>
  );
}