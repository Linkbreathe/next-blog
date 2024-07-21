import styles from '@/components/cardList/cardList.module.css'
import Pagination from '@/components/pagination/Pagination'
import Card from '@/components/card/Card'
import WEB_API from '@/utils/prefix'
import POST_PER_PAGE from '@/utils/config'
const getData = async (page, cat) => {
  const res = await fetch(`${WEB_API}/posts?page=${page}&cat=${cat || ""}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed")
  }
  console.log(res)
  return res.json()
}

const CardList = async ({ page, cat }) => {
  const { post, count } = await getData(page, cat);
  console.log(count)
  console.log(post)
  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {post?.map((item) => (<Card item={item} />))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} cat={cat} />
    </div>
  )
}

export default CardList