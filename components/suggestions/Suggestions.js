import { useState, useEffect, useContext } from "react";
import SuggestedProfile from "./SuggestedProfile";
import { getProfilesSuggestion } from "../../services/firebase";
import UserContext from "../../context/UserContext";
import Skeleton from "../Skeleton";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const suggestions = await getProfilesSuggestion();
      setSuggestions(
        suggestions
          .filter((suggestion) => suggestion.username !== user.username)
          .slice(0, 5)
      );
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex mb-[5px]">
          <h1 className="font-medium text-gray-300 text-[14px]">
            Suggestions For You
          </h1>
          <button className="ml-auto font-medium text-[12px]">See All</button>
        </div>
        <ul className="flex flex-col">
          {loading ? (
            <>
              {[...new Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex space-x-[10px] items-center py-[5px]"
                >
                  <Skeleton className="w-[32px] h-[32px] rounded-full" />
                  <div className="flex flex-col space-y-[4px]">
                    <Skeleton className="w-[115px] h-[15px] rounded-[4px]" />
                    <Skeleton className="w-[80px] h-[15px] rounded-[4px]" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {suggestions &&
                suggestions.map(({ avatar, username, docId }) => (
                  <SuggestedProfile
                    key={docId}
                    avatar={avatar}
                    username={username}
                    docId={docId}
                  />
                ))}
            </>
          )}
        </ul>
      </div>
    </>
  );
}
