import { useRef } from "react";
import Header from "../components/Header";
import Suggestions from "../components/suggestions";
import Stories from "../components/stories";
import Posts from "../components/post";
import Layout from "../components/Layout";

export default function Home() {
  const feedRef = useRef(null);

  return (
    <>
      <Header />
      <Layout>
        <div
          className="max-w-none flex flex-col 1000px:pr-[20px] mx-auto 1000px:mx-0 sm:w-full sm:max-w-[665px]"
          ref={feedRef}
        >
          <Stories />
          <Posts />
        </div>
        <Suggestions feedRef={feedRef} />
      </Layout>
    </>
  );
}
