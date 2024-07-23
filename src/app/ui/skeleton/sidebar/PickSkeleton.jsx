import React from 'react'
import { Card, Skeleton } from "@nextui-org/react";

export default function PickSkeleton() {
    return (
        <>

            <Card className="w-2/6 space-y-5 p-4 h-[25rem]" radius="lg">
                <Skeleton className="w-1/4 rounded-lg">
                    <div className="h-5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>

                <div className="max-w-[300px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>

                </div>
                <div className="max-w-[300px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>

                </div>
                <div className="max-w-[300px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>

                </div>
                <div className="max-w-[300px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>

                </div>
            </Card>

        </>
    )

}
