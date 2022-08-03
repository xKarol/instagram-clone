import Head from "next/head";
import { useRouter } from "next/router";
import ProfileContext from "../../context/ProfileContext";
import NotFoundPage from "../404";
import HeaderContainer from "../../containers/header";
import Layout from "../../components/layout";
import useProfile from "../../hooks/useProfile";
import {
  ProfileNavContainer,
  ProfilePostsListContainer,
  ProfileHeaderContainer,
} from "../../containers/profile";
import { useViewport } from "../../context/ViewportContext";
import { SCREEN_MEDIUM } from "../../constants/screens";
import LoadingScreen from "../../components/loading-screen";

const ProfilePage = () => {
  const router = useRouter();
  const { profile } = router.query;
  const { user: profileUser, loading, ...data } = useProfile(profile);
  const { width } = useViewport();
  const device = width >= SCREEN_MEDIUM ? "desktop" : "mobile";
  const notFound = !loading && !profileUser;

  if (loading) return <LoadingScreen />;
  if (notFound) return <NotFoundPage />;
  return (
    <>
      <Head>
        <title>
          {`${
            loading
              ? `@${profile}`
              : `${profileUser.fullName} (@${profileUser.username})`
          } • Instagram`}
        </title>
      </Head>

      <HeaderContainer />
      <ProfileContext.Provider value={{ ...data, loading, user: profileUser }}>
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
