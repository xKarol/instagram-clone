import clsx from "clsx";

export default function Layout({ children, className }) {
  return (
    <main
      className={clsx("max-w-[975px] mx-auto mt-[90px] pb-[50px]", className)}
    >
      {children}
    </main>
  );
}
