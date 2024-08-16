import React, { Suspense } from "react";
import styles from "./featured.module.css";
import { Spinner } from "@nextui-org/spinner";
import MapRender from "@/components/mapRender/MapRender";
import FeaturedSkeleton from "@/app/ui/FeaturedSkeleton";

const Featured = async () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Link was here! </b>
      </h1>
      <span className="text-2xl">
        Discover my creativity and endeavor.
      </span>
      <div className={styles.post}>
        <div className="w-2/3">
          <MapRender />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>What is Lorem Ipsum?</h1>
          <p className={styles.postDesc}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          <button className={styles.button}>Read more</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
