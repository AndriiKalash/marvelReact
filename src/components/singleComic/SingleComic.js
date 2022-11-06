import './singleComic.scss';

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

const SingleComic = () => {

    const [oneComics, setOneComics] = useState(null);
    const { loading, error, getOneComics } = useMarvelService();
    // метод react-router-dom, передает строчку id из Link в ComicsList 
    const { comicId } = useParams();

    useEffect(() => {
        updateOneComics();
    }, [comicId]);

    const updateOneComics = () => {
        getOneComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (res) => {
        document.body.style.marginRight = `${0}px`;
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

            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
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