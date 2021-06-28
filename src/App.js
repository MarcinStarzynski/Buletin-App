import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';
import styles from './App.scss';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Post } from './components/views/Post/Post';
import { PostEdit } from './components/views/PostEdit/PostEdit';
import { PostAdd } from './components/views/PostAdd/PostAdd';
import { NotFound } from './components/views/NotFound/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = (props) => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={styles.App}>
            <MainLayout>
              <Switch>
                <Route exact path='/' render={(props) => <Homepage {...props}/>} />
                <Route exact path='/post/add' component={PostAdd} />
                <Route exact path='/post/:id' component={Post} />
                <Route exact path='/post/:id/edit' component={PostEdit} />
                <Route path='*' component={NotFound} />
              </Switch>
            </MainLayout>
          </div>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  status: PropTypes.bool,
};

export { App };
