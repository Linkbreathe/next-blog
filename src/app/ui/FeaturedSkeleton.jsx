"use client";
import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const FeaturedSkeleton = () => {
    return (
        <Card className="w-full p-4 mt-5 h-auto  mx-auto rounded-lg shadow-md">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0 lg:w-2/3">
                    <Skeleton className="rounded-lg w-full h-[60vh]" />
                </div>
                <div className="flex flex-col gap-4 lg:w-1/2">
                    <Skeleton className="rounded-lg h-16 w-full" />
                    <Skeleton className="rounded-lg h-full w-full" />
                </div>
            </div>
        </Card>
    );
};

export default FeaturedSkeleton;
