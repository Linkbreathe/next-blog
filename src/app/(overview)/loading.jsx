import React from "react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image width={160} height={160} src="/2d-mario-running.gif" />
        </div>
    );
}