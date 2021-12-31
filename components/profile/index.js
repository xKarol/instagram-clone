import { useState, useEffect } from "react";
import Head from "next/head";
import { getUserByUsername, getUserPhotos } from "../../services/firebase";
import Layout from "../Layout";
import Header from "../Header";
import Statistics from "./Statistics";
import ProfileData from "./ProfileData";
import Nav from "./Nav";
import Photos from "./Photos";
import NotFoundPage from "../../pages/404";

export default function Profile({ profile }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const user = await getUserByUsername(profile);
      const photos = await getUserPhotos(profile);
      setUser(user);
      setPhotos(photos);
      setLoading(false);
    };
    loadData();
  }, [profile]);

  if (!user) return <NotFoundPage />;

  return (
    <>
      <Head>
        <title>
          {loading
            ? profile
            : `${user?.fullName} (@${user?.username}) • Instagram`}
        </title>
      </Head>
      <Layout>
        <Header />
        <div className="flex flex-col">
          <ProfileData user={user} photos={photos} />
          <Statistics
            posts={photos?.length}
            followers={user?.followers?.length}
            following={user?.followings?.length}
            className={"md:hidden"}
          />
          <Nav />
          <Photos photos={photos} />
        </div>
      </Layout>
    </>
  );
}
