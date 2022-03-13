import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';

import {ThemeProvider} from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import * as serviceWorker from './service-worker';
import AppContainer from './components/AppContainer';
import theme from './layout/theme';

import './styles/index.scss';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppContainer />
        </MuiPickersUtilsProvider>
    </ThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
