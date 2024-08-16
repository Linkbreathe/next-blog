import styles from '@/components/cardList/cardList.module.css'
import Pagination from '@/components/pagination/Pagination'
import PostItem from '@/components/postItem/PostItem'
import WEB_API from '@/utils/prefix'
import POST_PER_PAGE from '@/utils/config'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
const getData = async (page, cat) => {

  const res = await fetch(`${WEB_API}/posts?page=${page}&cat=${cat || ""}`, { cache: "no-store" });
  if (res.status === 304) {
    return res.json()
  }
  if (!res.ok) {
    throw new Error("Failed")
  }
  return res.json()
}

const CardList = async ({ page, cat }) => {
  const { post, count } = await getData(page, cat);
  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count
  return (
    <div >
      <h1 className="text-2xl	py-9">Recent Posts</h1>
      <div className={styles.posts}>
        {post?.map((item) => (
          <PostItem key={item.id} item={item} />
        ))}
      </div>
      <Pagination count={count} page={page} hasPrev={hasPrev} hasNext={hasNext} cat={cat} />
    </div>
  )
}

export default CardList