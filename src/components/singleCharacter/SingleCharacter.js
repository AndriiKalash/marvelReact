import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './singleCharacter.scss';

const Singlecharacter = () => {

    const {name} = useParams();
    const [characterByName, setCharacterByName] = useState([]);
    const character = characterByName[0];
    const { getOneCharacterByName, process, setProcess } = useMarvelService();

    useEffect(()=>{
        getOneCharacterByName(name)
        .then(res => setCharacterByName(res))
        .then(() => setProcess('confirmed'));
    },[])


    return (
        <div className="single-character">
            {setContent(process, character, View)}   
        </div>
    )
}

const View = ({data}) => {
    return (
        <>
          <img src={data.thumbnail} alt="x-men" className="single-character__img" />
          <div className="single-character__info">
            <h2 className="single-character__name">{data.name}</h2>
            <p className="single-character__descr">{data.description}</p>
          </div>
        </>
    )
}


export default Singlecharacter;



