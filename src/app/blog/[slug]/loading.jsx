import React from "react";
import Image from "next/image";

export default function Loading() {
    return (
        <div class="flex justify-center items-center">
            <Image width={160} height={160} src="/2d-mario-running.gif" />
        </div>
    );
}