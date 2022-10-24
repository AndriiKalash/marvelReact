import './singleComic.scss';

import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

const SingleComic = ({ setSelectComic, comicId }) => {

    const [oneComics, setOneComics] = useState(null);
    const { loading, error, getOneComics } = useMarvelService();

    useEffect(() => {
        updateOneComics();
    }, [comicId]);

    const updateOneComics = () => {

        if (!comicId) {
            return;
        }
        getOneComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (res) => {
        setOneComics(res);
    }


    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMassage /> : null;
    const content = oneComics ? <ComicView oneComics={oneComics} /> : null;

    return (
        <div className="single-comic">

            {spinner}
            {content}
            {errorMessage}

            <a onClick={() => setSelectComic(null)} href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

//component with comicInfo
const ComicView = ({ oneComics }) => {

    const { thumbnail, name, lang, description, pages, price } = oneComics;

    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">{lang}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        </>
    )
}

export default SingleComic;