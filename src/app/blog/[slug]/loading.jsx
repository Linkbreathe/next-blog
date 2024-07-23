
import PickSkeleton from "@/app/ui/skeleton/sidebar/PickSkeleton";
import PopularSkeleton from "@/app/ui/skeleton/sidebar/PopularSkeleton";
import TopicCategoriesSkeleton from "@/app/ui/skeleton/sidebar/TopicCategoriesSkeleton";
import React from "react";



export default function Loading() {
    return (
        <>
            <PopularSkeleton />
            <TopicCategoriesSkeleton />
            <PickSkeleton />
        </>
    );
}
