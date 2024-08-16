import { PersonInfo } from '@/components/personInfo/PersonInfo';
import React, { Suspense } from "react";
import { Spinner } from "@nextui-org/spinner";
import dynamic from "next/dynamic";

// import TestComponents from "@/components/testComponents/TestComponents"
import FeaturedSkeleton from "@/app/ui/FeaturedSkeleton"
const TestComponents = dynamic(() => import("@/components/testComponents/TestComponents"));
const ContactPage = () => {
    return (
        <div className=' h-screen'>
            <PersonInfo />
        </div>
    )
}
export default ContactPage;
