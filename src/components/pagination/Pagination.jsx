'use client'
import React from 'react'
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'
import POST_PER_PAGE from "@/utils/config"
const Pagination = ({ page, hasPrev, hasNext, cat, count }) => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <button disabled={!hasPrev} className={styles.button} onClick={() => router.push(`?page=${parseInt(page) - 1}&cat=${cat || ""}`)}>Previous</button>
      <span className={styles.pageContainer}>
        {page} / {parseInt(count / POST_PER_PAGE) + 1}
      </span>
      <button disabled={!hasNext} className={styles.button} onClick={() => router.push(`?page=${parseInt(page) + 1}&cat=${cat || ""}`)}>Next</button>
    </div>
  )
}

export default Pagination