import { createContext, useContext, useReducer, useState } from "react";
import { CREATE_PAGE, CROP_PAGE, SHARE_PAGE } from "../constants/globals";

export const PostUploadContext = createContext(null);
export const usePostUploadContext = () => useContext(PostUploadContext);

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

const PostUploadProvider = ({ children, setShow, show }) => {
  const [showDiscardBox, setShowDiscardBox] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const blockClose = () => {
    const discardPages = [CROP_PAGE, CREATE_PAGE, SHARE_PAGE];
    if (discardPages.indexOf(state.page) !== -1 && !state.uploaded) {
      setShow(true);
      setShowDiscardBox(true);
    } else {
      if (state.uploaded) {
        dispatch({ reset: true });
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
