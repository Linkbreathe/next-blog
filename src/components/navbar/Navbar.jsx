"use client"
import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
// import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, } from "@nextui-org/react";
// <CiSearch />
import { CiSearch } from "react-icons/ci";
import { usePathname } from 'next/navigation';

import { signOut, useSession } from "next-auth/react";

const MyNavbar = () => {
  const pathname = usePathname()
  //temporary
  const { data, status } = useSession()
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  }

  return (
    <Navbar maxWidth="full" height="5rem" isBordered>
      <NavbarBrand>
        <Link href="/">
          <Image height={100} width={100} src="/Link-icon.png" alt="" />
        </Link>
        {/* <p className="font-bold text-inherit">Link</p> */}
      </NavbarBrand>
      <NavbarContent as="div" className="items-center" justify="center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[15rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex gap-10">
        <NavbarItem >
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem isActive={pathname === "/"}>
          <Link color={pathname === "/" ? "primary" : "foreground"} href="/">
            Homepage
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/contact"}>
          <Link href="/contact" color={pathname === "/contact" ? "primary" : "foreground"}>
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/noteMap"}>
          <Link href="/noteMap" color={pathname === "/noteMap" ? "primary" : "foreground"}>
            IMap
          </Link>
        </NavbarItem>
        {
          status === null || status === "unauthenticated" ? (
            <NavbarItem isActive={pathname === "/login"}>
              <Link href="/login" color={pathname === "/login" ? "primary" : "foreground"}>
                Login
              </Link>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem isActive={pathname === "/write"} >
                <Link href="/write" color={pathname === "/write" ? "primary" : "foreground"}>
                  Write
                </Link>
              </NavbarItem>

              <NavbarItem isActive="false" >
                <span className="cursor-pointer" href="/#" onClick={handleLogout} >
                  Logout
                </span>
              </NavbarItem>
            </>
          )
        }
      </NavbarContent>


    </Navbar>
  );
};

export default MyNavbar;
