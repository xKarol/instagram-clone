import Post from ".";

export default function PostsList({ photos = [] }) {
  return photos.map((photo, index) => <Post key={index} data={photo} />);
}
