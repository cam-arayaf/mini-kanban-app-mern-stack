import React, { Fragment } from 'react';
import Header from './components/Header';
import Boards from './components/Boards';

const App = () => (
    <Fragment>
      	<Header />
      	<Boards />
    </Fragment>
);

App.displayName = "App";

export default App;