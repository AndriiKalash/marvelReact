import './comicsList.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';


const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0)
    const { loading, error, getAllComics } = useMarvelService();




    useEffect(() => {
        updateComics(true);
    }, []);

    const updateComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(loadedComics);
    }

    const loadedComics = (res) => {
        document.body.style.marginRight = `${0}px`;
        setComics([...comics, ...res]);
        setNewComicsLoading(false);
        setOffset(offset => offset + 8);
    }

    const renderComics = (arr) => {
        const comicsCards = arr.map((item, i) => {
            const { id, name, thumbnail, price } = item;
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li >
            )
        })
        return (
            <ul className="comics__grid">
                {comicsCards}
            </ul>
        )
    }

    const items = renderComics(comics);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMassage /> : null;

    return (
        <div className="comics__list">

            {spinner}
            {items}
            {errorMessage}

            <button
                disabled={newComicsLoading}
                onClick={() => updateComics(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;