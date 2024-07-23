"use client";

import styles from "./write.module.css";
import "react-quill/dist/quill.bubble.css";
import Image from "next/image";
import ReactQuill from "react-quill";
import useSWR from "swr";
import WEB_API from "@/utils/prefix";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/button";

function transformStringWithTimestamp(input) {
  let parts = input.split(' ');
  let transformedString = parts.join('-');
  let timestamp = Date.now();
  let shortTimestamp = timestamp.toString().slice(4, 8);
  transformedString += `-${shortTimestamp}`;
  return transformedString;
}

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message)
    throw error;
  }
  return data;
}

const storage = getStorage(app);

const WritePage = () => {

  const { data, isLoading, mutate } = useSWR(WEB_API + `/write`, fetcher);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null)
  const [media, setMedia] = useState("")
  const [title, setTitle] = useState("")
  const { status } = useSession();

  const handleSumbit = async () => {
    const { status } = await fetch("/api/write", {
      // 确定方法
      method: "POST",
      body: JSON.stringify({
        title: title,
        catSlug: "travel",
        img: media,
        desc: value,
        slug: transformStringWithTimestamp(title)
      })
    });
    mutate();
    setValue(""); // 清空textarea
    if (status === 200) router.push(`/blog/${transformStringWithTimestamp(title)}`)
    console.log(status)
  }

  useEffect(() => {

    const upload = () => {
      const name = Date.now() + file.name
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL)
            console.log('File available at', downloadURL);
          });
        }
      );
    }
    file && upload();
  }, [file])

  const router = useRouter();
  if (status === "loading") {
    return (<div>Loading...</div>)
  }
  if (status === "authenticated")
    return (
      <div className={styles.container}>
        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className={styles.input} />
        <div className={styles.editor}>
          <button className={styles.button} onClick={() => setOpen(!open)}>
            <Image src="/plus.png" alt="" width={16} height={16} />
          </button>
          {open && (
            <div className={styles.add}>
              <input
                id="image"
                onChange={(e) => { setFile(e.target.files[0]) }}
                type="file"
                className={styles.imgUploader}
              />
              <button className={styles.addButton}>
                <label htmlFor="image">
                  <Image src="/image.png" alt="" width={16} height={16} />
                </label>
              </button>
              <button className={styles.addButton}>
                <Image src="/external.png" alt="" width={16} height={16} />
              </button>
              <button className={styles.addButton}>
                <Image src="/video.png" alt="" width={16} height={16} />
              </button>
            </div>
          )}
          <ReactQuill
            className={styles.textArea}
            theme="bubble"
            value={value}
            onChange={setValue}
            placeholder={"Tell your story"}
          />
        </div>
        <button className={styles.publish} onClick={handleSumbit}>Publish</button>
      </div>
    );
};

export default WritePage;
