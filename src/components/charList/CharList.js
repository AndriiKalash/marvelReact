import { useEffect, useState } from 'react';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import CharCard from '../charCard/CharCard';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';


const CharList = ({ onCharacterId, selectCharId }) => {

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [newListLoading, setNewListLoading] = useState(false);
    const [limitEnd, setLimitEnd] = useState(false);
    const [scroll, setScroll] = useState(false);



    const marvelService = new MarvelService();

    const onNewListLoading = () => {
        setNewListLoading(true);
    }

    const onCharactersLoded = (res) => {

        let ended = false;
        if (res.length < 9) {
            ended = true;
        }

        setCharacters(characters => [...characters, ...res]);
        setLoading(false);
        setOffset(offset => offset + 9);
        setNewListLoading(false);
        setLimitEnd(ended);

    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    //   main request
    const updateCharacters = (offset) => {
        onNewListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharactersLoded)
            .catch(onError)
    }


    const onScroll = () => {
        // loading by scroll
        if (offset < 219) return;
        if (limitEnd) window.removeEventListener('scroll', onScroll);
        if (window.pageYOffset + document.documentElement.clientHeight >=
            (document.documentElement.scrollHeight)) {
            updateCharacters(offset);
        }
    }

    // call main with no arguments (default val)
    useEffect(() => {
        updateCharacters();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return window.removeEventListener('scroll', onScroll);
    }, []);

    // componentDidMount() {
    //     this.updateCharacters();
    //     window.addEventListener('scroll', this.onScroll);
    // }


    // // remove scroll if re-render
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.onScroll);
    // }

    const elements = characters.map((item) => {
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

    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const card = !(loading || error) ? elements : null;


    return (
        <div className="char__list">
            <ul style={(loading || error) ? { display: "block" } : { display: "grid" }} className="char__grid">
                {spinner}
                {card}
                {errorMessage}
            </ul>
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


