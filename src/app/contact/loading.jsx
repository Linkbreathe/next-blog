import React from "react";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex justify-center items-center">
            <Image width={160} height={160} src="/2d-mario-running.gif" />
        </div>
    );
}
