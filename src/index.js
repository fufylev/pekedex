import './index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Header from "./components/Header/Header";
import { DashBoard } from "./components/layout/DashBoard/DashBoard";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <DashBoard/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
