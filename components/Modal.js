import { CgClose } from "react-icons/cg";

export default function Modal({ show, setShow, element }) {
  return (
    <div
      className={`fixed ${
        !show ? "hidden" : null
      } left-0 top-0 h-screen w-screen bg-black/75 z-50 flex items-center justify-center`}
      onClick={() => setShow(false)}
    >
      <CgClose
        className="absolute top-[15px] right-[15px] text-white text-[30px] cursor-pointer"
        onClick={() => setShow(false)}
      />
      <main className="bg-white rounded-2xl z-10" onClick={(e) => e.stopPropagation()}>
          {element}
      </main>
    </div>
  );
}
