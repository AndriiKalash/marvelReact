import { useState } from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBaundary/ErrorBaundary"

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectChar, setSelectChar] = useState(null);

    const onCharacterId = (id) => {
        setSelectChar(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBaundary>
                    <RandomChar />
                </ErrorBaundary>

                <div className="char__content">

                    <ErrorBaundary>
                        <CharList
                            onCharacterId={onCharacterId}
                            selectCharId={selectChar} />
                    </ErrorBaundary>

                    <ErrorBaundary>
                        <CharInfo charId={selectChar} />
                    </ErrorBaundary>

                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )

}

export default App;