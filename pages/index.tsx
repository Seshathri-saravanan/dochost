import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAuth } from "../src/hooks/useAuth";
import HomeLayout from "../src/components/layouts/home-layout";

const Home: NextPage = () => {
  const auth: any = useAuth();
  if (!auth.user) return <h1>loading</h1>;
  return (
    <HomeLayout>
      <div className={styles.container}>
        <h1>dochost</h1>
        <h2>hello {auth.user.name}</h2>
      </div>
    </HomeLayout>
  );
};

export default Home;
