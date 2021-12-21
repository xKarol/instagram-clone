import StoryProfile from "./StoryProfile";
export default function Stories() {
  return (
    <section className="w-full bg-white border border-gray-300 flex p-[5px] gap-[10px] overflow-x-hidden">
      <StoryProfile active />
      <StoryProfile active />
      <StoryProfile />
      <StoryProfile />
      <StoryProfile />
      <StoryProfile />
      <StoryProfile />
      <StoryProfile />
      <StoryProfile />
      <StoryProfile />
    </section>
  );
}
