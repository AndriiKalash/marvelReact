import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Skeleton from '../../components/skeleton/Skeleton';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const marvelService = new MarvelService();

    const onCharLoading = () => {
        setLoading(true);
    }

    const onCharLoaded = (res) => {
        setLoading(false);
        setChar(res);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        onCharLoading();

        marvelService.getOneCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    useEffect(() => {
        updateChar();
    }, [props.charId]);



    const skeleton = !(loading || error || char) ? <Skeleton /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    const errorMessage = error ? <ErrorMassage /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

// component with info
const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const comicsList = comics.map((item, id, comics) => {
        comics.length = 10;
        return (
            <li key={id} className="char__comics-item" >
                {item.name}
            </li>
        )
    })

    const comicsSpace = (comics.length === 0) ?
        <li> No one comics with this character</li> :
        comicsList;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"
                    style={thumbnail.includes('not_available') ?
                        { objectFit: "contain" } :
                        { objectFit: "cover" }}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {comicsSpace}

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
};
export default CharInfo;

