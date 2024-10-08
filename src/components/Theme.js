import React, { Component } from 'react';
import { ThemeContext } from '../ThemeContext.js';
import "../css/Theme.css";

class Theme extends Component {
    static contextType = ThemeContext;

    handleChangeMode = () => {
        const { toggleTheme } = this.context;
        toggleTheme();
    };


    render() {
        return (
            <button className="theme" onClick={this.handleThemeChange}>
                Swich Mode
            </button>
        );
    }
}

export default Theme;
