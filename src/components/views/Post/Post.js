import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faPhoneAlt, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import StatusContext from '../../../context/StatusContex';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getOne } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

const Component = ({className, postsByID, props}) => {

  return(
    <StatusContext.Consumer>
      { value => (
        <div className={clsx(className, styles.root)}>
          <h2>Post: {postsByID.title}</h2>
          <Grid container spacing={3} className={styles.postContainer}>
            <Grid item xs={12} sm={5} className={styles.postItem}>
              <div className={styles.postItem__imageBox}>
                <img src={postsByID.image} alt={postsByID.title} className={styles.postImage}/>
              </div>
            </Grid>
            <Grid item xs={12} sm={7} className={styles.postItem}>
              <Card>
                <CardContent>
                  {value.status
                    ?
                    <div className={styles.postItem__link}>
                      <Link to={`/post/${postsByID.id}/edit`} className={styles.link}>Edit post</Link>
                    </div>
                    :
                    null
                  }
                  <div className={styles.postItem__group}>
                    <Typography color="textSecondary" variant="body2">
                      Status: {postsByID.status}
                    </Typography>
                    <Typography variant="h5">
                      {postsByID.price}
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" className={styles.postItem__content}>
                    {postsByID.content}
                  </Typography>
                  <Typography variant="subtitle1" className={styles.postItem__content}>
                    Contact
                    <div>
                      <FontAwesomeIcon icon={faAt} className={styles.icon}/> {postsByID.email}<br/>
                      <FontAwesomeIcon icon={faPhoneAlt} className={styles.icon}/> {postsByID.phone}<br/>
                      <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.icon}/> {postsByID.location}
                    </div>
                  </Typography>
                  <Typography color="textSecondary" variant="body2" className={styles.postItem__content}>
                    <span>Publication: {postsByID.datePublication}</span>
                    <span>Updated: {postsByID.dateLastUpdate}</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </StatusContext.Consumer>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
  props: PropTypes.object,
  params: PropTypes.object,
  postsByID: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    datePublication: PropTypes.string,
    dateLastUpdate: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
  }),
};

const mapStateToProps = (state, props) => ({
  postsAll: getAll(state),
  postsByID: getOne(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
