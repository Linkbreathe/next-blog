import React from 'react'
import { Card, Skeleton } from "@nextui-org/react";

export default function TopicCategoriesSkeleton() {
    return (
        <>
            <Card className="w-2/6 space-y-5 p-4 h-[20rem]" radius="lg">
                <Skeleton className="w-1/4 rounded-lg">
                    <div className="h-5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <div className="flex flex-wrap">
                    <div className="w-1/2 space-y-5 ">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                    <div className="w-1/2 space-y-5">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                </div>
            </Card>

        </>
    )

}
