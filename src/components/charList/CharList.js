import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import useMarvelService from "../../services/MarvelService";

import CharCard from "../charCard/CharCard";
import Spinner from "../../components/spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

const CharList = () => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(213);
  const [newListLoading, setNewListLoading] = useState(false);
  const [limitEnd, setLimitEnd] = useState(false);
  const { loading, error, getAllCharacters } = useMarvelService();

  //   main request
  const updateCharacters = (offset, initial) => {
    initial ? setNewListLoading(false) : setNewListLoading(true);
    getAllCharacters(offset).then(onCharactersLoded);
  };

  const onCharactersLoded = (res) => {
    if (res.length < 9) setLimitEnd(true);
    setCharacters((characters) => [...characters, ...res]);
    setOffset((offset) => offset + 9);
    setNewListLoading(false);
  };

  useEffect(() => {
    updateCharacters(offset, true);
  }, []);

  function renderCararacters(arr) {
    const element = arr.map((item) => {
      const { id } = item;
      return (
        <Link to="topList" smooth={true} duration={500} key={id}>
          <CharCard {...item} />
        </Link>
      );
    });
    return <ul className="char__grid">{element}</ul>;
  }

  const items = renderCararacters(characters);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newListLoading ? <Spinner /> : null;

  return (
    <div name="topList" className="char__list">
      {spinner}
      {items}
      {errorMessage}
      <button
        onClick={() => {
          updateCharacters(offset);
        }}
        disabled={newListLoading}
        style={{ display: limitEnd ? "none" : "block" }}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
