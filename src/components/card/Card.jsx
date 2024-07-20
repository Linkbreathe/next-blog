import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = ({ item }) => {
  const formattedDate = item.createdAt.split('T')[0];
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {
          item.img && <Image src={item.img} alt="" fill className={styles.image} />
        }
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{formattedDate} - </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href="/">
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>
          {item.desc}
        </p>
        <Link href={`/blog/${item.slug}`} className={styles.link}>Read more</Link>
      </div>
    </div>
  );
};

export default Card;
