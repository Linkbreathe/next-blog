
import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
// import Image from "next/image";
import WEB_API from '@/utils/prefix'
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

const getData = async () => {
  const res = await fetch(`${WEB_API}/categories`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed")
  }
  return res.json()
}

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 class="text-2xl	py-8" className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {
          data?.map((item) => (<Link href="/blog?cat=style" className={`${styles.category} ${styles[item.slug]}`}>
            {data.img && <Image
              src={item.img}
              alt=""
              width={32}
              height={32}
              className={styles.image}
            />}
            {item.slug}
          </Link>))
        }
      </div>
    </div>
  );

};

export default CategoryList;
