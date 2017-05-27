import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
//css
import './index.css';
//components
import Home from './Components/Home';

injectTapEventPlugin();

/*const App = () => {
    <MuiThemeProvider>
        <Home />
    </MuiThemeProvider>
}*/

const muiTheme = getMuiTheme(
    {
        appBar: {
            height: 56
        },
        palette: {
            primary1Color: Colors.lightWhite,
            textColor: Colors.darkBlack,
            alternateTextColor: Colors.darkBlack,
            accent1Color: Colors.darkBlack
        }
    }
)

class App extends Component {
    render() {
        return(
            <MuiThemeProvider muiTheme={muiTheme}>
                <Home />
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);