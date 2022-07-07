import Profile from "./Profile";
import SuggestionsList from "./SuggestionsList";

export default function Suggestions() {
  return (
    <aside className="absolute w-[300px] left-[calc(100%_+_10px)] top-0 hidden 1000px:block">
      <Profile />
      <SuggestionsList />
    </aside>
  );
}
