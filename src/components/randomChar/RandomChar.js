import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../../components/spinner/Spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    // экземпляр класса
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoaded = (res) => {
        this.setState({
            char: res,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    updateChar = () => {
        // const id = 1011377;
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService.getOneCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)

    }


    render() {

        const { char, loading, error } = this.state;

        const loadSpinner = loading ? <Spinner /> : null;
        const loadView = !(loading || error) ? <View char={char} /> : null;
        const loadError = error ? <ErrorMassage /> : null;

        return (
            <div className="randomchar">

                {loadSpinner}
                {loadView}
                {loadError}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div onClick={this.updateChar} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    return (
        <div className="randomchar__block">
            <img src={thumbnail}
                style={thumbnail.includes('not_available') ? { objectFit: "contain" } : { objectFit: "cover" }}
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


