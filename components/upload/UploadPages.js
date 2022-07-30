import Head from "next/head";
import { usePostUploadContext } from "../../context/PostUploadContext";
import Header from "./Header";
import Crop from "./crop";
import Details from "./settings";
import UploadBox from "./UploadBox";
import Share from "./Share";
import Modal from "../modal";
import DiscardBox from "./DiscardBox";
import {
  MAIN_PAGE,
  CROP_PAGE,
  CREATE_PAGE,
  SHARE_PAGE,
} from "../../constants/globals";

export default function UploadPages() {
  const {
    state: { page, previewFiles },
    setShowDiscardBox,
    showDiscardBox,
  } = usePostUploadContext();

  return (
    <>
      <Head>
        <title>Create new post • Instagram</title>
        <meta name="description" content="Instagram Upload Photos" />
      </Head>
      <article
        className="h-[400px] relative transition-all ease-in-out delay-300"
        data-cy="add-post-modal"
      >
        <Header />
        <section className="flex h-[calc(100%-45px)] flex-col sm:flex-row">
          {page === MAIN_PAGE && <UploadBox />}
          {page === CROP_PAGE && <Crop src={previewFiles} />}
          {page === CREATE_PAGE && (
            <>
              <Crop src={previewFiles} disableBtns />
              <Details />
            </>
          )}
          {page === SHARE_PAGE && <Share />}
        </section>
      </article>
      <Modal
        show={showDiscardBox}
        setShow={setShowDiscardBox}
        element={<DiscardBox />}
        closeHide
      />
    </>
  );
}
