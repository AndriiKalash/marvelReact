import { Component } from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBaundary/ErrorBaundary"

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectChar: null
    }

    onCharacterId = (id) => {
        this.setState({
            selectChar: id
        })
    }


    render() {

        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBaundary>
                        <RandomChar />
                    </ErrorBaundary>

                    <div className="char__content">

                        <ErrorBaundary>
                            <CharList
                                onCharacterId={this.onCharacterId}
                                selectCharId={this.state.selectChar} />
                        </ErrorBaundary>

                        <ErrorBaundary>
                            <CharInfo charId={this.state.selectChar} />
                        </ErrorBaundary>

                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;