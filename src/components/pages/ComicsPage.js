import { useState } from 'react';

import AppBanner from '../appBanner/AppBanner'
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';
import ErrorBaundary from "../errorBaundary/ErrorBaundary";


const ComicsPage = () => {

    const [selectComic, setSelectComic] = useState(null);

    const onComicId = (id) => {
        setSelectComic(id);
    }

    return (
        <>
            <AppBanner />
            {
                selectComic ? <ErrorBaundary>
                    <SingleComic setSelectComic={setSelectComic} comicId={selectComic} />
                </ErrorBaundary> :
                    <ErrorBaundary>
                        <ComicsList onComicId={onComicId} />
                    </ErrorBaundary>
            }
        </>
    )
}

export default ComicsPage;