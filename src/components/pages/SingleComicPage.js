import SingleComic from '../singleComic/SingleComic';
import ErrorBaundary from "../errorBaundary/ErrorBaundary";

const SingleComicPage = () => {

    return (
        <>
            <ErrorBaundary>
                <SingleComic />
            </ErrorBaundary>
        </>
    )
}

export default SingleComicPage;