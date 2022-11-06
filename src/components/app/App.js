import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import { } from '../pages'
import AppContext from '../../services/context';

// lazy loading
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharacterPage = lazy(() => import("../pages/SingleCharacterPage"))


const App = () => {

    const [characterByName, setCharacterByName] = useState(null);

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <AppContext.Provider value={{ characterByName, setCharacterByName }}>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/comics" element={<ComicsPage />} />
                                <Route path="/comics/:comicId" element={<SingleComicPage />} />
                                <Route path='/character/:name' element={<SingleCharacterPage />} />
                                <Route path="*" element={<Page404 />} />
                            </Routes>
                        </AppContext.Provider>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;