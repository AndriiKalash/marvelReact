import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
// import Skeleton from '../../components/skeleton/Skeleton';
// import Spinner from '../../components/spinner/Spinner';
// import ErrorMassage from '../errorMessage/ErrorMessage';
import "./charInfo.scss";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const { getOneCharacter, loading, error, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }
    getOneCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharLoaded = (res) => {
    setChar(res);
  };

  // // use finent-state machine instead  traditinal logic
  // const setContent = (process, char) => {
  //     switch (process) {
  //         case 'waiting':
  //             return <Skeleton />
  //         case 'loading':
  //             return <Spinner />
  //         case 'confirmed':
  //             return <View char={char} />
  //         case 'error':
  //             return <ErrorMassage />
  //     }
  // }

  // const skeleton = !(loading || error || char) ? <Skeleton /> : null;
  // const spinner = loading ? <Spinner /> : null;
  // const content = !(loading || error || !char) ? <View char={char} /> : null;
  // const errorMessage = error ? <ErrorMassage /> : null;

  return (
    <>
      <div className="char__info">
        {/* {skeleton}
                {errorMessage}
                {spinner}
                {content} */}
        {setContent(process, char, View)}
      </div>
    </>
  );
};

// component with info
// props sended like data becouse it is coming from new function setContent
const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  const comicsList = comics.map((item, id, comics) => {
    comics.length = 10;
    return (
      <li key={id} className="char__comics-item">
        {item.name}
      </li>
    );
  });

  const comicsSpace =
    comics.length === 0 ? (
      <li> No one comics with this character</li>
    ) : (
      comicsList
    );

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt="abyss"
          style={
            thumbnail.includes("not_available")
              ? { objectFit: "contain" }
              : { objectFit: "cover" }
          }
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
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{comicsSpace}</ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
