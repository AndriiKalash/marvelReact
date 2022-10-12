import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';

// import MarvelService from './services/MarvelService'

// const marvelService = new MarvelService();

// check data from server
// marvelService.getOneCharacter(1011400).then(res => console.log(res));
// marvelService.getAllCharacters().then(res => console.log(res));

ReactDOM.render(

  <App />,

  document.getElementById('root')
);

