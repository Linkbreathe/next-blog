"use client"
import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function RecentPostSkeleton() {
    return (
        <Card className="w-full space-y-5 p-4 h-[60rem]" radius="lg">
            <Skeleton className="w-1/4 rounded-lg">
                <div className="h-5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <div className="max-w-6xl w-full flex items-center gap-3">
                <div>
                    <Skeleton className="rounded-md w-52 h-52" />
                </div>
                <div className="w-full flex flex-col gap-5">
                    <Skeleton className="h-10 w-3/5 rounded-lg" />
                    <Skeleton className="h-36 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="max-w-6xl w-full flex items-center gap-3">
                <div>
                    <Skeleton className="rounded-md w-52 h-52" />
                </div>
                <div className="w-full flex flex-col gap-5">
                    <Skeleton className="h-10 w-3/5 rounded-lg" />
                    <Skeleton className="h-36 w-4/5 rounded-lg" />
                </div>
            </div>
            <div className="max-w-6xl w-full flex items-center gap-3">
                <div>
                    <Skeleton className="rounded-md w-52 h-52" />
                </div>
                <div className="w-full flex flex-col gap-5">
                    <Skeleton className="h-10 w-3/5 rounded-lg" />
                    <Skeleton className="h-36 w-4/5 rounded-lg" />
                </div>
            </div>
        </Card>

    );
}
