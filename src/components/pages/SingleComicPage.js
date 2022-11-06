import AppBanner from '../appBanner/AppBanner'
import SingleComic from '../singleComic/SingleComic';
import ErrorBaundary from "../errorBaundary/ErrorBaundary";

const SingleComicPage = () => {

    return (
        <>
            <AppBanner />
            <ErrorBaundary>
                <SingleComic />
            </ErrorBaundary>
        </>
    )
}

export default SingleComicPage;