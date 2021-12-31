export default function Layout(props) {
  return (
    <div className="max-w-[975px] mx-auto mt-[90px] pb-[50px] ">
      {props.children}
    </div>
  );
}
