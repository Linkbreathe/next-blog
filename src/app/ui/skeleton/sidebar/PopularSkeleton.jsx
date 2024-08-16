"use client"
import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function PopularSkeleton() {
    return (
        <Card className="w-full space-y-5 p-4 h-[34rem]" radius="lg">
            <div className="space-y-3">
                <Skeleton className="w-1/4 rounded-lg">
                    <div className="h-5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>

                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-7 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-5/6 rounded-lg">
                    <div className="h-7 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-2/6 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>

                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-7 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-5/6 rounded-lg">
                    <div className="h-7 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-2/6 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>

                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-7 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-5/6 rounded-lg">
                    <div className="h-7 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-2/6 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>

                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-7 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-5/6 rounded-lg">
                    <div className="h-7 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-2/6 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    );
}
