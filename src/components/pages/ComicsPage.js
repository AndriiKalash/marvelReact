import ComicsList from '../comicsList/ComicsList';
import ErrorBaundary from "../errorBaundary/ErrorBaundary";


const ComicsPage = () => (
  <>
    <ErrorBaundary>
        <ComicsList />
    </ErrorBaundary>
  </>
)

export default ComicsPage;