import clsx from "clsx";
import { useLayoutEffect } from "react";
import { CgClose } from "react-icons/cg";

const Modal = ({ show, setShow, element, closeHide, onClose }) => {
  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose?.();
    }
  };

  useLayoutEffect(() => {
    if (show) {
      document.body.style.overflow = `${show ? "hidden" : "visible"}`;
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [show]);

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
          {!closeHide && (
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
            {element}
          </main>
        </section>
      )}
    </>
  );
};

export default Modal;
