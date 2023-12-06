import ComicsList from "../components/comicsList/ComicsList";
import ErrorBaundary from "../components/errorBaundary/ErrorBaundary";

const ComicsPage = () => (
  <>
    <ErrorBaundary>
      <ComicsList />
    </ErrorBaundary>
  </>
);

export default ComicsPage;
