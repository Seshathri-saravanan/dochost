import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home = ({ children, ...others }: any) => {
  return (
    <div className={styles.container}>
      <h1>dochost</h1>
    </div>
  );
};

export default Home;
