import { Component } from 'react';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import CharCard from '../charCard/CharCard';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';


class CharList extends Component {


    state = {
        characters: [],
        loading: true,
        error: false,
        offset: 210,
        newListLoading: false,
        limitEnd: false
    }

    marvelService = new MarvelService();

    onNewListLoading = () => {
        this.setState({
            newListLoading: true
        })
    }

    onCharactersLoded = (res) => {

        let ended = false;
        if (res.length < 9) {
            ended = true;
        }

        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...res],
            loading: false,
            offset: offset + 9,
            newListLoading: false,
            limitEnd: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    //   main request
    updateCharacters = (offset) => {
        this.onNewListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharactersLoded)
            .catch(this.onError)
    }

    onScroll = () => {
        // loading by scroll
        if (this.state.offset < 219) return;
        if (this.state.limitEnd) window.removeEventListener('scroll', this.onScroll);
        if (window.pageYOffset + document.documentElement.clientHeight >=
            (document.documentElement.scrollHeight)) {
            this.updateCharacters(this.state.offset);
        }
    }

    // call main with no arguments (default val)
    componentDidMount() {
        this.updateCharacters();
        window.addEventListener('scroll', this.onScroll);
    }


    // remove scroll if re-render
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }



    render() {

        const { characters, loading, error, offset, newListLoading, limitEnd } = this.state;
        const { onCharacterId, selectCharId } = this.props;

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
                    onClick={() => { this.updateCharacters(offset) }}
                    disabled={newListLoading}
                    style={{ 'display': limitEnd ? "none" : "block" }}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div >
        )
    }
}


export default CharList;


