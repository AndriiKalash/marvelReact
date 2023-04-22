import Singlecharacter from '../singleCharacter/SingleCharacter';
import ErrorBaundary from "../errorBaundary/ErrorBaundary";

const SingleCharacterPage = () => (
        <>
            <ErrorBaundary>
                <Singlecharacter />
            </ErrorBaundary>
        </>
);

export default SingleCharacterPage;