import { useState } from 'react';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBaundary/ErrorBaundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectChar, setSelectChar] = useState(null);

    const onCharacterId = (id) => {
        setSelectChar(id);
    }

    return (
        <>
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
        </>

    )

}


export default MainPage;