import SingleComic from "../components/singleComic/SingleComic";
import ErrorBaundary from "../components/errorBaundary/ErrorBaundary";

const SingleComicPage = () => {
  return (
    <>
      <ErrorBaundary>
        <SingleComic />
      </ErrorBaundary>
    </>
  );
};

export default SingleComicPage;
