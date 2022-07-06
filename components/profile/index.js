import Head from "next/head";
import Layout from "../Layout";
import HeaderContainer from "../../containers/header";
import Statistics from "./Statistics";
import ProfileData from "./ProfileData";
import Nav from "./Nav";
import Photos from "./Photos";
import NotFoundPage from "../../pages/404";
import ProfileContext from "../../context/ProfileContext";
import useProfile from "../../hooks/useProfile";

export default function Profile({ profile }) {
  const { setUser, user, setPhotos, photos, loading } = useProfile(profile);

  if (!user) return <NotFoundPage />;
  return (
    <>
      <Head>
        <title>
          {`${
            loading ? `@${profile}` : `${user?.fullName} (@${user?.username})`
          } • Instagram`}
        </title>
      </Head>
      <ProfileContext.Provider
        value={{ setUser, user, setPhotos, photos, loading }}
      >
        <Layout>
          <HeaderContainer />
          <div className="flex flex-col">
            <ProfileData user={user} photos={photos} />
            <Statistics className={"md:hidden"} />
            <Nav />
            <Photos />
          </div>
        </Layout>
      </ProfileContext.Provider>
    </>
  );
}
