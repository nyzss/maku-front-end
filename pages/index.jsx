import { Button, Text, Input } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <Head>
        <title>maku</title>
      </Head>
      <div>
        <Text>{isLoggedIn}</Text>
      </div>
    </>
  );
}
