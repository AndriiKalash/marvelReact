import { useState } from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBaundary/ErrorBaundary";
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

import decoration from '../../resources/img/vision.png';


const App = () => {

    const [selectChar, setSelectChar] = useState(null);
    const [selectComic, setSelectComic] = useState(null);

    const onCharacterId = (id) => {
        setSelectChar(id);
    }

    const onComicId = (id) => {
        setSelectComic(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBaundary>
                    <RandomChar />
                </ErrorBaundary>

                {/* <div className="char__content">

                    <ErrorBaundary>
                        <CharList
                            onCharacterId={onCharacterId}
                            selectCharId={selectChar} />
                    </ErrorBaundary>

                    <ErrorBaundary>
                        <CharInfo charId={selectChar} />
                    </ErrorBaundary>

                </div> */}
                {
                    selectComic ? <ErrorBaundary>
                        <SingleComic setSelectComic={setSelectComic} comicId={selectComic} />
                    </ErrorBaundary> :
                        <ErrorBaundary>
                            <ComicsList onComicId={onComicId} />
                        </ErrorBaundary>
                }


                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )

}

export default App;