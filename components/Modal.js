import { CgClose } from "react-icons/cg";

export default function Modal({ show, setShow, element, closeHide, onClose }) {
  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <div
          className={`fixed ${
            !show ? "hidden" : null
          } left-0 top-0 h-screen w-screen bg-black/75 z-50 flex items-center justify-center`}
          onClick={handleClose}
        >
          {!closeHide && (
            <button
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
        </div>
      )}
    </>
  );
}
