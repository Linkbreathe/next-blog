"use client";

import styles from "./write.module.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import 'katex/dist/katex.css';


import React, { useContext } from 'react';
import { ThemeContext } from "@/context/ThemeContext";

import useSWR from "swr";
import WEB_API from "@/utils/prefix";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import getCodeString from 'rehype-rewrite';

import { FaCloudUploadAlt } from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import { BiCategory } from "react-icons/bi";

import { notifySuccess, notifyError } from "@/components/noftify/Notify";
import Notify from "@/components/noftify/Notify";
import GeoLocateButton from "@/components/geoLocateButton/GeoLocateButton";

import dynamic from "next/dynamic";
// import katex from 'katex';
import {
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";

// Dynamically import katex
const katex = dynamic(() => import('katex'), { ssr: false });

// Dynamically import components from @nextui-org/react
const Image = dynamic(() => import('@nextui-org/react').then(mod => mod.Image), { ssr: false });
const Modal = dynamic(() => import('@nextui-org/react').then(mod => mod.Modal), { ssr: false });
const ModalContent = dynamic(() => import('@nextui-org/react').then(mod => mod.ModalContent), { ssr: false });
const ModalHeader = dynamic(() => import('@nextui-org/react').then(mod => mod.ModalHeader), { ssr: false });
const ModalBody = dynamic(() => import('@nextui-org/react').then(mod => mod.ModalBody), { ssr: false });
const ModalFooter = dynamic(() => import('@nextui-org/react').then(mod => mod.ModalFooter), { ssr: false });
const Spinner = dynamic(() => import('@nextui-org/react').then(mod => mod.Spinner), { ssr: false });
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

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
  const [selectedKeys, setSelectedKeys] = useState("");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  }
  const [file, setFile] = useState(null)
  const [media, setMedia] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("# Support markdown and katex grammar")
  const [images, setImages] = useState([]);
  const [upLoading, setUploading] = useState(false);

  const [position, setPosition] = useState({});
  const { status } = useSession();
  const { theme } = useContext(ThemeContext)

  const handleSubmit = async () => {
    // 验证输入
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
    if (Object.keys(position).length === 0 && position.constructor === Object) {
      notifyError("Please get the current position");
      return;
    }

    // 发送请求
    const response = await fetch("/api/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        catSlug: selectedValue,
        img: media,
        desc: desc,
        pick: false,
        slug: transformStringWithTimestamp(title),
        location: {
          type: "note", // Adjust as needed
          coordinates: [position.lat, position.lng] // Assuming `position` is in [lat, long] format
        }
      })
    });

    const { status } = response;
    if (status === 200) {
      notifySuccess("Published successfully, waiting for a while...");
      router.push(`/blog/${transformStringWithTimestamp(title)}`);
    } else {
      notifyError("Failed to publish the blog. Please try again.");
    }
    // 调用 mutate
    mutate();
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
          // console.log('Upload is ' + progress + '% done');
          setUploading(true)
          switch (snapshot.state) {
            case 'paused':
              // console.log('Upload is paused');
              break;
            case 'running':
              // console.log('Upload is running');
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
            // console.log('File available at', downloadURL);
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
                          <div className="flex flex-wrap	gap-2 items-center justify-center" key={item}>
                            {/* <div className="flex-1 flex justify-center items-center"> */}
                            <Image className="flex-1 object-cover" src={item} isZoomed width={150} height={150} alt="uploaded images' url" />
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
            <GeoLocateButton setPosition={setPosition} />
          </div>


          <Button onPress={handleSubmit} className="bg-gradient-to-r  from-green-300 to-transparent">
            <IoIosSend />
          </Button>
          <Notify />
        </div>
        <div data-color-mode={theme}>
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
