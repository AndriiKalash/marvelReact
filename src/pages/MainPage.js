import { useState } from "react";
import { animateScroll as scroll } from "react-scroll";

import AppContext from "../services/context";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import SearchForm from "../components/searchForm/SearchForm";
import ErrorBaundary from "../components/errorBaundary/ErrorBaundary";

import decoration from "../resources/img/vision.png";

const MainPage = () => {
  const [selectChar, setSelectChar] = useState(null);

  const onCharacterId = (id) => {
    setSelectChar(id);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <ErrorBaundary>
        <RandomChar />
      </ErrorBaundary>
      <div className="char__content">
        <ErrorBaundary>
          <AppContext.Provider value={{ onCharacterId, selectChar }}>
            <CharList />
          </AppContext.Provider>
        </ErrorBaundary>
        <div>
          <ErrorBaundary>
            <CharInfo charId={selectChar} />
          </ErrorBaundary>
          <SearchForm />
        </div>
      </div>

      <img className="bg-decoration" src={decoration} alt="vision" />

      <div
        onClick={scrollToTop}
        className="button button__secondary"
        style={{ position: "absolute", right: "0px", bottom: "100px" }}
      >
        <div className="inner">UP</div>
      </div>
    </>
  );
};

export default MainPage;
