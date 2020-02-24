import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import logo from './../../assets/img/logo.png';

const Header = () => (
    <AppBar position="sticky">
        <Toolbar>
            <img src={ logo } alt="logo" width="32" heigth="32"></img>
            &nbsp;&nbsp;
            <h2>Mini Kanban App</h2>
        </Toolbar>
    </AppBar>
);

Header.displayName = "Header";

export default Header;