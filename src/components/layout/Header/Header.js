import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className, status}) => (
  <div className={styles.root}>
    <Link to={'/'} className={styles.logo}>Bulletin Board</Link>
    <div className={styles.buttons}>
      {status
        ?
        <div>
          <Button color="primary" variant="outlined" href="https://google.com">
            My announcements
          </Button>
          <Button color="primary" variant="outlined" href='/post/add'>
            Add announcement
          </Button>
        </div>
        :
        <Button color="primary" variant="outlined" href="https://google.com">
          Login
        </Button>
      }
    </div>
  </div>
);

Component.propTypes = {
  setLogged: PropTypes.func,
  className: PropTypes.string,
  status: PropTypes.bool,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
