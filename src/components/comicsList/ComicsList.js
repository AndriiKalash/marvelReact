import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../../components/spinner/Spinner";
import ErrorMassage from "../errorMessage/ErrorMessage";
import "./comicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [offset, setOffset] = useState(35);
  const [limitEnd, setLimitEnd] = useState(false);
  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    updateComics(offset, true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  const updateComics = (offset, initial) => {
    initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
    getAllComics(offset).then(loadedComics);
  };

  const loadedComics = (res) => {
    if (res.length < 8) setLimitEnd(true);
    setComics([...comics, ...res]);
    setNewComicsLoading(false);
    setOffset((offset) => offset + 8);
  };

  const onScroll = () => {
    if (limitEnd) window.removeEventListener("scroll", onScroll);
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight &&
      offset >= 8
    ) {
      updateComics(offset);
    }
  };

  const renderComics = (arr) => {
    const comicsCards = arr.map((item, i) => {
      const { id, name, thumbnail, price } = item;
      return (
        <li key={i} className="comics__item">
          <Link to={`/comics/${id}`}>
            <img
              src={thumbnail}
              alt="ultimate war"
              className="comics__item-img"
            />
            <div className="comics__item-name">{name}</div>
            <div className="comics__item-price">{price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{comicsCards}</ul>;
  };

  const items = renderComics(comics);
  const spinner = loading && !newComicsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMassage /> : null;

  return (
    <div className="comics__list">
      {spinner}
      {items}
      {errorMessage}
      <button
        disabled={newComicsLoading}
        onClick={() => updateComics(offset)}
        className="button button__main button__long"
        style={{ display: limitEnd ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
