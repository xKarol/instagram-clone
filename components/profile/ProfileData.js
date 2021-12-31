import Avatar from "../Avatar";
import Biography from "./Biography";
import ProfileHeader from "./Header";
import Statistics from "./Statistics";

export default function ProfileData({ user, photos }) {
  return (
    <div className="flex mb-[50px]">
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] mx-[25px] md:mx-[100px]">
            <Avatar src={user?.avatar} />
          </div>
          <main className="flex flex-col space-y-[15px]">
            <ProfileHeader username={user?.username} />
            <Statistics
              posts={photos?.length}
              followers={user?.followers?.length}
              following={user?.followings?.length}
              className={"hidden md:flex border-none"}
            />
            <Biography
              biography={user?.fullName}
              className={"hidden md:block"}
            />
          </main>
        </div>
        <Biography
          biography={user?.fullName}
          className={"m-[25px] text-[14px] md:hidden"}
        />
      </div>
    </div>
  );
}
