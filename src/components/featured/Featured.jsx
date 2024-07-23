import React from "react";
import styles from "./featured.module.css";
import { Image } from "@nextui-org/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Link was here!</b>
        Discover my creativity and endeavor.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image isZoomed class="object-cover" height={450} width={700} src="/p1.jpeg" alt="" fill className={styles.image} />
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
