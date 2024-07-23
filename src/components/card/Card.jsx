import styles from "./card.module.css";
import { Image } from "@nextui-org/image";
import Link from "next/link";

const options = {
  wordwrap: 130,
};

const Card = ({ item }) => {
  const formattedDate = item.createdAt.split('T')[0];
  return (
    <div className={styles.container}>

      <div className={styles.imageContainer}>
        {
          item.img && <Image isZoomed class="object-cover" width={500} height={370} src={item.img} alt="" className={styles.image} />
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
        {item?.desc}
        <div className={styles.texts} dangerouslySetInnerHTML={{ __html: item?.desc }} />
        <Link href={`/blog/${item.slug}`} className={styles.link}>Read more</Link>
      </div>
    </div>
  );
};

export default Card;
