'use client'
import styles from "./comments.module.css";
import Image from "next/image";
import WEB_API from "@/utils/prefix"
import useSWR from "swr";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { format } from 'date-fns';

const formatDate = (isoDate) => {
  return format(new Date(isoDate), 'yyyy-MM-dd HH:mm');
};

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message)
    throw error;
  }
  return data;
}

const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const { data, isLoading, error } = useSWR(WEB_API + `/comments?postSlug=${postSlug}`, fetcher);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
          ></textarea>
          <button className={styles.button}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}

      {isLoading ? "loading" :
        data?.comments?.map((item) => (
          <div key={item.id} className={styles.comments}>
            <div className={styles.comment}>
              <div className={styles.user}>
                <div className={styles.userImageContainer}>
                  <Image
                    src={item.user.image}
                    alt=""
                    className={styles.image}
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.username}>{item.user.name}</span>
                  <span className={styles.date}>{formatDate(item.createdAt)}</span>
                </div>
              </div>
              <p className={styles.desc}>
                {item.desc}
              </p>
            </div>
          </div>
        )
        )}
    </div>
  );
};

export default Comments;
