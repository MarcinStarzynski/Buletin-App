import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HeaderComponent } from '../Header/Header';
import { LoginSwitch } from '../../common/LoginSwitch/LoginSwitch';
import StatusContext from '../../../context/StatusContex';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './MainLayout.module.scss';

const Component = ({className, children}) => {

  const [ status , setStatusUser ] = useState(true);
  // console.log('children', children);
  // console.log('children.props.children', children.props.children);

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
        <LoginSwitch setStatusUser={setStatusUser}/>
        {React.cloneElement(<HeaderComponent />, { status: status })}
        <StatusContext.Provider value={{status}}>
          <div className={styles.container}>
            {children}
          </div>
        </StatusContext.Provider>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
