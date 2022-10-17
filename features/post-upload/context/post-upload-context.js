import { createContext, useContext, useReducer, useState } from "react";
import { CREATE_PAGE, CROP_PAGE, SHARE_PAGE } from "../constants";

export const PostUploadContext = createContext(null);
export const usePostUploadContext = () => useContext(PostUploadContext);

const initialState = {
  caption: "",
  error: false,
  page: 0,
  file: {},
  previewSrc: "",
  uploaded: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CAPTION": {
      return { ...state, caption: action.payload };
    }
    case "SET_FILE": {
      return { ...state, file: action.payload };
    }
    case "SET_PREVIEW_SRC": {
      return { ...state, previewSrc: action.payload };
    }
    case "SET_UPLOADED": {
      return { ...state, uploaded: action.payload };
    }
    case "SET_PAGE": {
      return { ...state, page: action.payload };
    }
    case "SET_ERROR": {
      return { ...state, error: action.payload };
    }
    case "RESET": {
      return initialState;
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
};

const PostUploadProvider = ({ children, setShow, show }) => {
  const [showDiscardBox, setShowDiscardBox] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const blockClose = () => {
    const discardPages = [CROP_PAGE, CREATE_PAGE, SHARE_PAGE];
    if (discardPages.includes(state.page) && !state.uploaded) {
      setShow(true);
      setShowDiscardBox(true);
    } else {
      if (state.uploaded) {
        dispatch({ type: "RESET" });
      }
    }
  };

  return (
    <PostUploadContext.Provider
      value={{
        state,
        dispatch,
        setShow,
        show,
        setShowDiscardBox,
        showDiscardBox,
        blockClose,
      }}
    >
      {children}
    </PostUploadContext.Provider>
  );
};

export default PostUploadProvider;
