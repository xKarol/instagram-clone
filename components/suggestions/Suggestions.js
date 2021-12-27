import { useState, useEffect, useContext } from "react";
import SuggestedProfile from "./SuggestedProfile";
import { getProfilesSuggestion } from "../../services/firebase";
import UserContext from "../../context/UserContext";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const suggestions = await getProfilesSuggestion();
      setSuggestions(
        suggestions
          .filter((suggestion) => suggestion.username !== user.username)
          .slice(0, 5)
      );
    };
    getData();
  }, []);

  return (
    <>
      {!!suggestions.length && (
        <div className="flex flex-col">
          <div className="flex mb-[5px]">
            <h1 className="font-medium text-gray-300 text-[14px]">
              Suggestions For You
            </h1>
            <button className="ml-auto font-medium text-[12px]">See All</button>
          </div>
          <ul className="flex flex-col">
            {suggestions &&
              suggestions.map(({ avatar, username, docId }) => (
                <SuggestedProfile
                  key={docId}
                  avatar={avatar}
                  username={username}
                  docId={docId}
                />
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
