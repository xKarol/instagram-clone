import clsx from "clsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  captionText: string;
  elementsProps?: Partial<{ caption: React.ComponentPropsWithoutRef<"p"> }>;
};

const PostUploadError = ({
  children,
  captionText,
  elementsProps,
  ...props
}: Props) => {
  const { className: captionClassName, ...captionProps } =
    elementsProps.caption;

  return (
    <div
      className="flex flex-col w-full justify-center items-center"
      {...props}
    >
      <AiOutlineExclamationCircle className="text-[100px]" />
      <p
        className={clsx("text-[20px] text-center", captionClassName)}
        {...captionProps}
      >
        {captionText}
      </p>
      {children}
    </div>
  );
};

export default PostUploadError;
