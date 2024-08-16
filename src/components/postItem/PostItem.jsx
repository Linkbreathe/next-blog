import styles from "./card.module.css";
import { Image } from "@nextui-org/image";
import Link from "next/link";

const PostItem = ({ item }) => {
  const formattedDate = item.createdAt.split('T')[0];
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {item.img &&
          <Image
            isZoomed
            className={styles.image}
            width={350}
            height={230}
            src={item.img}
            alt={`Image for ${item.title}`}
          />
        }
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{formattedDate} - </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href="/">
          <h1 className={styles.title}>{item.title}</h1>
        </Link>
        <Link href={`/blog/${item.slug}`} className={styles.link}>Read More</Link>
      </div>
    </div>
  );
};

export default PostItem;
