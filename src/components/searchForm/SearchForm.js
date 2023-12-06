import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import "./searcform.scss";

const SearchForm = () => {
  const [characterByName, setCharacterByName] = useState(null);
  const { getOneCharacterByName, clearError } = useMarvelService();

  const updateCharacterByName = (name) => {
    clearError();
    getOneCharacterByName(name).then(onCharacterByNameLoaded);
  };

  const onCharacterByNameLoaded = (res) => {
    setCharacterByName(res);
  };

  useEffect(() => {
    setCharacterByName(null);
  }, []);

  const resaltView = !characterByName ? null : characterByName.length > 0 ? (
    <SaccesRes characterByName={characterByName[0]} />
  ) : (
    <RejectRes />
  );

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required"),
      })}
      onSubmit={(values) => {
        updateCharacterByName(values.name);
      }}
    >
      <div className="char__form">
        <Form>
          <label htmlFor="name" className="char__form-label">
            Or find a character by name:
          </label>
          <div className="char__form-block">
            <Field
              className="char__info-field"
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
            />
            <button className=" button button__main" type="submit">
              <div className="inner">FIND</div>
            </button>
            <ErrorMessage
              name="name"
              className="char__form-error"
              component="div"
            />
            <div className="char__form-error-block">{resaltView}</div>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

const SaccesRes = ({ characterByName }) => {
  return (
    <>
      <div className="char__form-error">
        There is! Visit {characterByName.name} page?
      </div>
      <Link
        to={`/character/${characterByName.name}`}
        className="button button__secondary char__form-topage "
        type="submit"
      >
        <div className="inner">TO PAGE</div>
      </Link>
    </>
  );
};

const RejectRes = () => {
  return (
    <div className="char__form-error">
      The character was not found. Check the name and try again
    </div>
  );
};

export default SearchForm;
