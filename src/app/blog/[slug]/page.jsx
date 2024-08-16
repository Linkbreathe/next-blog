import styles from "./singlePage.module.css";
import Image from "next/image";
import WEB_API from "@/utils/prefix";
import { format } from 'date-fns';
import React, { Suspense } from "react";
import { Spinner } from "@nextui-org/spinner";

import Articles from "@/components/articles/Articles";
import Comments from "@/components/comments/Comments";
import Menu from "@/components/Menu/Menu";
// import { Avatar } from "@nextui-org/react";

const formatDate = (isoDate) => {
  return format(new Date(isoDate), 'yyyy-MM-dd HH:mm');
};

const getData = async (slug) => {
  const res = await fetch(`${WEB_API}/blog/${slug}`, { cache: "no-store" });
  if (res.status === 304) {
    return res.json();
  }
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const { blog } = await getData(slug);
  return (
    <div className="relative overflow-hidden">
      <div
        className="relative flex items-center justify-center h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${blog.img})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 p-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{blog.title}</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-16 h-16 relative">
              {blog?.user?.image && (
                <Image src={blog.user.image} alt="" layout="fill" className="rounded-full object-cover" />
                // <Avatar isBordered color="primary" radius="full" size="lg" src={blog.user.image} />
              )}
            </div>
            <div className="text-lg">
              <span className="block font-semibold">{blog.user.name}</span>
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-[5]">
            <Articles desc={blog?.desc} />
            <Suspense fallback={<div className="flex items-center justify-center"><Spinner /></div>}>
              <div className="mt-8">
                <Comments postSlug={slug} />
              </div>
            </Suspense>
          </div>
          <div className="flex-[2]">
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
