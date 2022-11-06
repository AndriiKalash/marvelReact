import { useContext } from 'react';

import AppContext from '../../services/context';
import './singleCharacter.scss'

const Singlecharacter = () => {

    const { characterByName } = useContext(AppContext);
    const character = characterByName[0];

    return (
        <div className="single-character">
            <img src={character.thumbnail} alt="x-men" className="single-character__img" />
            <div className="single-character__info">
                <h2 className="single-character__name">{character.name}</h2>
                <p className="single-character__descr">{character.description}</p>
            </div>
        </div>
    )
}


export default Singlecharacter;



