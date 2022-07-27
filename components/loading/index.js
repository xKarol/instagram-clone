import clsx from "clsx";

export default function Loading({ className, ...props }) {
  return <div className={clsx("loading", className)} {...props} />;
}
