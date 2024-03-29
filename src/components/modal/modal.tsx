import clsx from "clsx";
import { CgClose } from "react-icons/cg";
import { useLockBodyScroll } from "react-use";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  hideCloseIcon: boolean;
} & React.PropsWithChildren;

const Modal = ({ show, setShow, children, hideCloseIcon, onClose }: Props) => {
  useLockBodyScroll(show);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose?.();
    }
  };

  return (
    <>
      {show && (
        <section
          className={clsx(
            "fixed",
            !show && "hidden",
            "left-0 top-0 h-screen w-screen bg-black/75 z-50 flex items-center justify-center"
          )}
          onClick={handleClose}
        >
          {!hideCloseIcon && (
            <button
              aria-label="close modal"
              className="absolute top-[15px] right-[15px] text-white text-[30px] cursor-pointer"
              onClick={handleClose}
            >
              <CgClose />
            </button>
          )}
          <main
            className="bg-white rounded-2xl z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </main>
        </section>
      )}
    </>
  );
};

export default Modal;
