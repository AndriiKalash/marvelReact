import AppBanner from '../appBanner/AppBanner'
import Singlecharacter from '../singleCharacter/SingleCharacter';
import ErrorBaundary from "../errorBaundary/ErrorBaundary";

const SingleCharacterPage = () => {

    return (
        <>
            <AppBanner />
            <ErrorBaundary>
                <Singlecharacter />
            </ErrorBaundary>
        </>
    )
}

export default SingleCharacterPage;