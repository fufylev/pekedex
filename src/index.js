import './index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

class App extends Component {
    render() {
        return (
            <div className="container">
                <h1>Hello world!</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
