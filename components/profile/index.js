import { useState, useEffect } from "react";
import Head from "next/head";
import { getUserByUsername, getUserPhotos } from "../../services/firebase";
import Layout from "../Layout";
import Header from "../Header";
import Avatar from "../Avatar";
import Statistics from "./Statistics";
import Biography from "./Biography";
import ProfileHeader from "./Header";
import Nav from "./Nav";
import Photos from "./Photos";

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
      console.log(photos);
      setLoading(false);
    };
    loadData();
  }, [profile]);

  return (
    <>
      <Head>
        <title>
          {loading
            ? profile
            : `${user?.fullName} (@${user?.username}) • Instagram`}
        </title>
      </Head>
      <Header />
      <Layout>
        <div className="flex flex-col">
          <div className="flex mb-[50px]">
            <div className="w-[150px] h-[150px] mx-[100px]">
              <Avatar src={user?.avatar} size={150} />
            </div>
            <main className="flex flex-col space-y-[15px]">
              <ProfileHeader username={user?.username} />
              <Statistics
                posts={photos?.length}
                followers={user?.followers?.length}
                following={user?.followings?.length}
              />
              <Biography biography={user?.fullName} />
            </main>
          </div>
          <Nav />
          <Photos photos={photos} />
        </div>
      </Layout>
    </>
  );
}
