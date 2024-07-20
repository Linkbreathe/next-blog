import styles from "./singlePage.module.css";
import Image from "next/image";
import Menu from "@/components/Menu/Menu";
import Comments from "@/components/comments/Comments";
import WEB_API from "@/utils/prefix";
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
  const formattedDate = blog.createdAt.split('T')[0];
  return (
    <div className={styles.container}>
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
              <span className={styles.date}>{formattedDate}</span>
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
