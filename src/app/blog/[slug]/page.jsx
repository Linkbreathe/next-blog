import styles from "./singlePage.module.css";
import Image from "next/image";
import Menu from "@/components/Menu/Menu";
import Comments from "@/components/comments/Comments";
import WEB_API from "@/utils/prefix";

import { format } from 'date-fns';
import Loading from "./loading";

const formatDate = (isoDate) => {
  return format(new Date(isoDate), 'yyyy-MM-dd HH:mm');
};

const getData = async (slug) => {
  const res = await fetch(`${WEB_API}/blog/${slug}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed")
  }
  return res.json()
}


const SinglePage = async ({ params }) => {
  const { slug } = params
  const { blog } = await getData(slug)
  return (
    // <div className={styles.container}>

    //   <Loading />
    // </div>
    <div className={styles.container}>
      <Loading />
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            {blog.title}
          </h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              {
                blog?.user?.image &&
                <Image src={blog.user.image} alt="" fill className={styles.avatar} />
              }
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.user}>{blog.user.name}</span>
              <span className={styles.date}>{formatDate(blog.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {
            blog?.img &&
            <Image src={blog.img} alt="" fill className={styles.image} />
          }
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          {/* key point */}
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: blog?.desc }} />

          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
