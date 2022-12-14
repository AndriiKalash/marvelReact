// import { useState } from 'react';

import AppBanner from '../appBanner/AppBanner'
import ComicsList from '../comicsList/ComicsList';
import ErrorBaundary from "../errorBaundary/ErrorBaundary";


const ComicsPage = () => {

    return (
        <>
            <AppBanner />

            <ErrorBaundary>
                <ComicsList />
            </ErrorBaundary>

        </>
    )
}

export default ComicsPage;