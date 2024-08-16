import styles from "../homepage.module.css";
// import Featured from "@/components/featured/Featured";
// import CardList from "@/components/cardList/CardList";
// import Menu from "@/components/Menu/Menu";
import React, { Suspense, lazy } from "react";

import PickSkeleton from "@/app/ui/skeleton/sidebar/PickSkeleton";
import PopularSkeleton from "@/app/ui/skeleton/sidebar/PopularSkeleton";
import RecentPostSkeleton from "@/app/ui/RecentPostSkeleton";
import FeaturedSkeleton from "@/app/ui/FeaturedSkeleton";

const Featured = lazy(() => import('@/components/featured/Featured'));
const CardList = lazy(() => import('@/components/cardList/CardList'));
const Menu = lazy(() => import('@/components/Menu/Menu'));


export default function Home({ searchParams }) {
  const page = searchParams.page || 1;
  return (
    <div >
      <Suspense fallback={<div className="mt-5">
        <FeaturedSkeleton />
      </div>
      }>
        <Featured />
      </Suspense>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[2] lg:flex-[3]">
          <Suspense fallback={<div className="mt-5">
            <RecentPostSkeleton />
          </div>
          }>
            <CardList page={page} />
          </Suspense>
        </div>

        <div className="flex-1 lg:w-1/4">
          <Suspense
            fallback={
              <div className="flex flex-col gap-6 mt-5">
                <PopularSkeleton />
                <PickSkeleton />
              </div>
            }
          >
            <Menu />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
