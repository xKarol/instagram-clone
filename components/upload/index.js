import { useState, useReducer } from "react";
import Modal from "../modal";
import UploadContext from "../../context/UploadContext";
import UploadPages from "./UploadPages";
import { CROP_PAGE, CREATE_PAGE, SHARE_PAGE } from "../../constants/globals";

const initialState = {
  uploaded: false,
  page: 0,
  caption: "",
  error: {},
  files: [],
  previewFiles: [],
};

const reducer = (state, newState) => {
  if (newState.reset) return initialState;
  return { ...state, ...newState };
};

export default function Upload({ show, setShow }) {
  const [showDiscardBox, setShowDiscardBox] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const blockClose = () => {
    if (
      state.page === CROP_PAGE ||
      state.page === CREATE_PAGE ||
      (state.page === SHARE_PAGE && !state.uploaded)
    ) {
      setShow(true);
      setShowDiscardBox(true);
    } else {
      state?.uploaded && dispatch({ reset: true });
    }
  };

  return (
    <UploadContext.Provider
      value={{
        state,
        dispatch,
        setShow,
        show,
        setShowDiscardBox,
        showDiscardBox,
      }}
    >
      <Modal
        show={show}
        setShow={setShow}
        element={<UploadPages />}
        onClose={blockClose}
      />
    </UploadContext.Provider>
  );
}
