import Head from "next/head";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import NotFoundPage from "./404";
import { Layout } from "../components/layout";
import { LoadingScreen } from "../components/loading-screen";
import { SCREEN_MEDIUM } from "../constants/screens";
import { useViewport } from "../context/viewport-context";
import { HeaderContainer } from "../features/header/containers";
import {
  ProfileHeaderContainer,
  ProfileNavContainer,
  ProfilePostsListContainer,
} from "../features/profile/containers";
import { ProfileContext } from "../features/profile/context";
import { useProfile } from "../features/profile/hooks";

const ProfilePage = () => {
  const router = useRouter();
  const { profile: username } = router.query;
  const { data, loading, error } = useProfile(username);
  const [profile, setProfile] = useState(data);
  const { width } = useViewport();
  const device = width >= SCREEN_MEDIUM ? "desktop" : "mobile";
  const notFound = (!loading && !profile) || error;

  useLayoutEffect(() => {
    setProfile(data);
  }, [data]);

  if (loading) return <LoadingScreen />;
  if (notFound) return <NotFoundPage />;
  return (
    <>
      <Head>
        <title>
          {`${
            loading
              ? `@${username}`
              : `${data.user.fullName} (@${data.user.username})`
          } • Instagram`}
        </title>
      </Head>

      <HeaderContainer />
      <ProfileContext.Provider value={{ profile, loading, setProfile, error }}>
        <Layout>
          <ProfileHeaderContainer viewport={device} />
          <ProfileNavContainer />
          <ProfilePostsListContainer />
        </Layout>
      </ProfileContext.Provider>
    </>
  );
};

export default ProfilePage;
