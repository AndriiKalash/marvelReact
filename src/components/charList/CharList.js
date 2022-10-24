import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

import CharCard from '../charCard/CharCard';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';



const CharList = ({ onCharacterId, selectCharId }) => {

    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newListLoading, setNewListLoading] = useState(false);
    const [limitEnd, setLimitEnd] = useState(false);
    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        updateCharacters(offset, true);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [offset]);

    //   main request
    const updateCharacters = (offset, initial) => {
        initial ? setNewListLoading(false) : setNewListLoading(true);
        getAllCharacters(offset)
            .then(onCharactersLoded)
        // .catch(onError)
    }

    const onCharactersLoded = (res) => {
        let ended = false;
        if (res.length < 9) {
            ended = true;
        }
        setCharacters(characters => [...characters, ...res]);
        setOffset(offset => offset + 9);
        setNewListLoading(false);
        setLimitEnd(ended);
    }

    const onScroll = () => {
        if (limitEnd) window.removeEventListener('scroll', onScroll);
        if (window.pageYOffset + document.documentElement.clientHeight >=
            (document.documentElement.scrollHeight) && offset >= 219) {
            updateCharacters(offset);
        }
    };

    function renderCararacters(arr) {
        const element = arr.map((item) => {
            const { id, name, thumbnail } = item;
            return (
                <CharCard
                    key={id}
                    name={name}
                    thumbnail={thumbnail}
                    id={id}
                    // {...item}
                    onCharacterId={onCharacterId}
                    selectCharId={selectCharId}
                />
            )
        })
        return (
            <ul className="char__grid">
                {element}
            </ul>
        )
    }

    const items = renderCararacters(characters);
    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading && !newListLoading ? <Spinner /> : null;
    // const card = !(loading || error) ? elements : null;

    return (
        <div className="char__list">

            {spinner}
            {items}
            {errorMessage}

            <button
                onClick={() => { updateCharacters(offset) }}
                disabled={newListLoading}
                style={{ 'display': limitEnd ? "none" : "block" }}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div >
    )
}


export default CharList;


