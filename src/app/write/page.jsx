"use client";

import styles from "./write.module.css";
import useSWR from "swr";
import WEB_API from "@/utils/prefix";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import getCodeString from 'rehype-rewrite';
import katex from 'katex';
import 'katex/dist/katex.css';

import {
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";

import { FaCloudUploadAlt } from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import { BiCategory } from "react-icons/bi";

import { notifySuccess, notifyError } from "@/components/noftify/Notify";
import Notify from "@/components/noftify/Notify";


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

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const storage = getStorage(app);

const WritePage = () => {

  const { data, isLoading, mutate } = useSWR(WEB_API + `/write`, fetcher);
  const [selectedKeys, setSelectedKeys] = useState("");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  }
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null)
  const [media, setMedia] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("# Support markdown and katex grammar")
  const [images, setImages] = useState([]);
  const [upLoading, setUploading] = useState(false);
  const { status } = useSession();

  const handleSumbit = async () => {
    const { status } = await fetch("/api/write", {
      // 确定方法
      method: "POST",
      body: JSON.stringify({
        title: title,
        catSlug: selectedValue,
        img: media,
        desc: desc,
        slug: transformStringWithTimestamp(title)
      })
    });
    if (title === "") {
      notifyError("Please enter the title of the blog");
      return;
    }
    if (desc === "") {
      notifyError("Please input the description of what your thought");
      return;
    }
    if (selectedValue === "") {
      notifyError("Please choose the category");
      return;
    }
    mutate();

    if (status === 200) {
      notifySuccess("published successfully, waiting for a while ... ")
      router.push(`/blog/${transformStringWithTimestamp(title)}`)
    }
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
          setUploading(true)
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
          notifyError("meet some problems when uploading images")
          setUploading(false)
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            notifySuccess("successfully uploaded")
            setMedia(downloadURL)
            setImages(() => { setImages([...images, downloadURL]) })
            setFile(null)
            setUploading(false)
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

        <div className="flex justify-between ">
          <div className="flex gap-4 items-center mb-3">


            {
              upLoading ?
                <Button isDisabled="true" className="bg-gradient-to-r from-blue-200 to-transparent">
                  <Spinner className="bg-gradient-to-r  from-blue-200 to-transparent" />
                </Button> :
                <Button className="bg-gradient-to-r from-blue-200 to-transparent">
                  <label htmlFor="image">
                    <FaCloudUploadAlt />
                  </label>
                </Button>
            }

            <input
              id="image"
              onChange={(e) => { setFile(e.target.files[0]) }}
              type="file"
              className={styles.imgUploader}
            />
            <Button onPress={() => handleOpen()} className="bg-gradient-to-r from-blue-200 to-transparent"><PiLinkSimpleBold /></Button>

            <Modal
              size="4xl"
              isOpen={isOpen}
              onClose={onClose}
              scrollBehavior="inside"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Uploaded Images' Url</ModalHeader>
                    <ModalBody>
                      {
                        images.length !== 0 ? images.map((item) => ((
                          <div className="flex flex-wrap	gap-3 items-center justify-center" key={item}>
                            {/* <div className="flex-1 flex justify-center items-center"> */}
                            <Image className="flex-1 " src={item} isZoomed width={150} height={150} className="object-cover" alt="uploaded images' url" />
                            {/* </div> */}
                            <div className="flex-1  bg-slate-200 p-2 rounded-md	">
                              <article className="text-balance ">
                                <p>{item}</p>
                              </article>
                            </div>
                          </div>))) : (<span>waiting for uploading images</span>)
                      }

                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Action
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>


            <Dropdown>
              <DropdownTrigger>

                <Button className="bg-gradient-to-r  from-blue-200 to-transparent"><BiCategory />{selectedValue}</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
              >
                <DropdownItem key="coding">coding</DropdownItem>
                <DropdownItem key="style">style</DropdownItem>
                <DropdownItem key="food">food</DropdownItem>
                <DropdownItem key="fashion">fashion</DropdownItem>
                <DropdownItem key="culture">culture</DropdownItem>
                <DropdownItem key="travel">travel</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </div>
          <Button onPress={handleSumbit} className="bg-gradient-to-r  from-green-300 to-transparent"><IoIosSend /></Button>
          <Notify />
        </div>
        <div>

          <MDEditor
            value={desc}
            onChange={(desc) => setDesc(desc)}
            previewOptions={{
              components: {
                code: ({ children = [], className, ...props }) => {
                  if (typeof children === 'string' && /^\$\$(.*)\$\$/.test(children)) {
                    const html = katex.renderToString(children.replace(/^\$\$(.*)\$\$/, '$1'), {
                      throwOnError: false,
                    });
                    return <code dangerouslySetInnerHTML={{ __html: html }} style={{ background: 'transparent' }} />;
                  }
                  const code = props.node && props.node.children ? getCodeString(props.node.children) : children;
                  if (
                    typeof code === 'string' &&
                    typeof className === 'string' &&
                    /^language-katex/.test(className.toLocaleLowerCase())
                  ) {
                    const html = katex.renderToString(code, {
                      throwOnError: false,
                    });
                    return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                  }
                  return <code className={String(className)}>{children}</code>;
                },
              },
            }}
          />

        </div>
      </div>
    );
};


export default WritePage;
