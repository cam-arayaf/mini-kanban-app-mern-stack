import React, { Fragment } from 'react';
import Header from './components/Header';
import Boards from './components/Boards';
import Footer from './components/Footer';

const App = () => (
    <Fragment>
      	<Header />
        <Boards />
        <Footer />
    </Fragment>
);

App.displayName = "App";

export default App;