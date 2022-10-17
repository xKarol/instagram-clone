import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import LoadingScreen from "../../components/loading-screen";
import { SCREEN_MEDIUM } from "../../constants/screens";
import { useViewport } from "../../context/viewport-context";
import { HeaderContainer } from "../../features/header/containers";
import {
  ProfileHeaderContainer,
  ProfileNavContainer,
  ProfilePostsListContainer,
} from "../../features/profile/containers";
import { ProfileContext } from "../../features/profile/context";
import useProfile from "../../hooks/use-profile";
import NotFoundPage from "../404";

const ProfilePage = () => {
  const router = useRouter();
  const { profile } = router.query;
  const { data, loading, error } = useProfile(profile);
  const { width } = useViewport();
  const device = width >= SCREEN_MEDIUM ? "desktop" : "mobile";
  const notFound = (!loading && !data) || error;

  if (loading) return <LoadingScreen />;
  if (notFound) return <NotFoundPage />;
  return (
    <>
      <Head>
        <title>
          {`${
            loading
              ? `@${profile}`
              : `${data.user.fullName} (@${data.user.username})`
          } • Instagram`}
        </title>
      </Head>

      <HeaderContainer />
      <ProfileContext.Provider value={{ ...data, loading }}>
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
