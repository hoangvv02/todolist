import React, { Component } from 'react';
import "../css/Theme.css";

class Theme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,
        };
    }
    toggleTheme = () => {
        this.setState((State) => ({
            isDarkMode: !State.isDarkMode,
        }));
    };
    render() {
        const { isDarkMode } = this.state;

        return (
            <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                <header className="theme">
                    <h1>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</h1>
                    <button onClick={this.toggleTheme}>
                        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </button>
                </header>
            </div>
        );
    }
}

export default Theme;