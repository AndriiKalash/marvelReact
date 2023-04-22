import { lazy, Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import BannerLayout from '../layots/BannerLayout';

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharacterPage = lazy(() => import("../pages/SingleCharacterPage"))


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                            <Routes>
                                <Route path='/' element={<BannerLayout/>}>
                                     <Route path="" element={<MainPage />} />     
                                     <Route path="comics" element={<ComicsPage />} />
                                     <Route path="comics/:comicId" element={<SingleComicPage />} />
                                     <Route path='character/:name' element=       {<SingleCharacterPage />} />
                                     <Route path="*" element={<Page404 />} />
                                </Route>
                               
                            </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;