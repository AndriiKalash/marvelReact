import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';
// import Spinner from '../../components/spinner/Spinner';
// import ErrorMassage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {

    const [char, setChar] = useState({});
    const { loading, error, process, setProcess, getOneCharacter, clearError } = useMarvelService();


    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);
        return () => clearInterval(timerId);
    }, []);

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getOneCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (res) => {
        setChar(res);
    }


    // const loadSpinner = loading ? <Spinner /> : null;
    // const loadView = !(loading || error) ? <View char={char} /> : null;
    // const loadError = error ? <ErrorMassage /> : null;

    return (
        <div className="randomchar">

            {/* {loadSpinner}
            {loadView}
            {loadError} */}
            {setContent(process, char, View)}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div onClick={updateChar} className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}



const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki } = data;

    return (
        <div className="randomchar__block">
            <img src={thumbnail}
                style={(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ?
                    { objectFit: "contain" } : { objectFit: "cover" }}
                // style={thumbnail.includes('not_available') ? { objectFit: "contain" } : { objectFit: "cover" }}
                alt="Random character"
                className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;



