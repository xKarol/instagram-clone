import Head from "next/head";
import { useRouter } from "next/router";
import Profile from "../../components/profile";
import ProfileContext from "../../context/ProfileContext";
import NotFoundPage from "../404";
import HeaderContainer from "../../containers/header";
import Layout from "../../components/layout";
import useProfile from "../../hooks/useProfile";

export default function ProfilePage() {
  const router = useRouter();
  const { profile } = router.query;
  const { user: profileUser, loading, ...data } = useProfile(profile);
  const { username, fullName } = profileUser;

  if (!profileUser) return <NotFoundPage />;
  return (
    <>
      <Head>
        <title>
          {`${
            loading ? `@${profile}` : `${fullName} (@${username})`
          } • Instagram`}
        </title>
      </Head>

      <HeaderContainer />
      <ProfileContext.Provider value={{ ...data, user: profileUser }}>
        <Layout>
          <Profile />
        </Layout>
      </ProfileContext.Provider>
    </>
  );
}
