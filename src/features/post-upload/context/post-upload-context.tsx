import React, { createContext, useContext, useReducer, useState } from "react";
import { CREATE_PAGE, CROP_PAGE, SHARE_PAGE } from "../constants";

type PostUploadContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  setShowDiscardBox: React.Dispatch<React.SetStateAction<boolean>>;
  showDiscardBox: boolean;
  blockClose: () => void;
};

export const PostUploadContext = createContext<PostUploadContextType>(null);
export const usePostUploadContext = () => useContext(PostUploadContext);

type StateType = {
  caption: string;
  error: boolean;
  page: number;
  file: File | Record<string, unknown>;
  previewSrc: string;
  uploaded: boolean;
};

enum ActionTypes {
  SET_CAPTION = "SET_CAPTION",
  SET_FILE = "SET_FILE",
  SET_PREVIEW_SRC = "SET_PREVIEW_SRC",
  SET_UPLOADED = "SET_UPLOADED",
  SET_PAGE = "SET_PAGE",
  SET_ERROR = "SET_ERROR",
  RESET = "RESET",
}

type ActionType =
  | { type: "SET_CAPTION"; payload: StateType["caption"] }
  | { type: "SET_FILE"; payload: StateType["file"] }
  | { type: "SET_PREVIEW_SRC"; payload: StateType["previewSrc"] }
  | { type: "SET_UPLOADED"; payload: StateType["uploaded"] }
  | { type: "SET_PAGE"; payload: StateType["page"] }
  | { type: "SET_ERROR"; payload: StateType["error"] }
  | { type: "RESET" };

const initialState: StateType = {
  caption: "",
  error: false,
  page: 0,
  file: {},
  previewSrc: "",
  uploaded: false,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.SET_CAPTION: {
      return { ...state, caption: action.payload };
    }
    case ActionTypes.SET_FILE: {
      return { ...state, file: action.payload };
    }
    case ActionTypes.SET_PREVIEW_SRC: {
      return { ...state, previewSrc: action.payload };
    }
    case ActionTypes.SET_UPLOADED: {
      return { ...state, uploaded: action.payload };
    }
    case ActionTypes.SET_PAGE: {
      return { ...state, page: action.payload };
    }
    case ActionTypes.SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case ActionTypes.RESET: {
      return initialState;
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
};

type Props = React.PropsWithChildren & {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};

const PostUploadProvider = ({ children, setShow, show }: Props) => {
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
