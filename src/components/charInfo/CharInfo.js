import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Skeleton from '../../components/skeleton/Skeleton';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './charInfo.scss';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
        skeleton: true
    }


    marvelService = new MarvelService();

    onCharLoading = () => {
        this.setState({
            loading: true,
            skeleton: false
        })
    }

    onCharLoaded = (res) => {
        this.setState({
            loading: false,
            char: res
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            skeleton: false,
            error: true
        })
    }

    updateChar = () => {
        const id = this.props.charId;
        if (!id) {
            return;
        }
        this.onCharLoading();

        this.marvelService.getOneCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    render() {

        const { char, loading, error, skeleton } = this.state;

        const loadSkeleton = !(loading || error || char) ? <Skeleton /> : null;
        const loadSpinner = loading ? <Spinner /> : null;
        const loadView = !(loading || error || skeleton) ? <View char={char} /> : null;
        const loadError = error ? <ErrorMassage /> : null;


        return (
            <div className="char__info">
                {loadSkeleton}
                {loadSpinner}
                {loadView}
                {loadError}
            </div>
        )
    }
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