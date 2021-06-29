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
import { fetchPost, getPost } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const { fetchOnePost } = this.props;
    console.log('hehe');
    fetchOnePost();
    console.log(this.props);
  }

  render() {
    const {className, post} = this.props;
    console.log(post, this.props);

    return(
      <StatusContext.Consumer>
        { value => (
          <div className={clsx(className, styles.root)}>
            <h2>Post: {post.title}</h2>
            <Grid container spacing={3} className={styles.postContainer}>
              <Grid item xs={12} sm={5} className={styles.postItem}>
                <div className={styles.postItem__imageBox}>
                  <img src={post.image} alt={post.title} className={styles.postImage}/>
                </div>
              </Grid>
              <Grid item xs={12} sm={7} className={styles.postItem}>
                <Card>
                  <CardContent>
                    {value.status
                      ?
                      <div className={styles.postItem__link}>
                        <Link to={`/posts/${post._id}/edit`} className={styles.link}>Edit post</Link>
                      </div>
                      :
                      null
                    }
                    <div className={styles.postItem__group}>
                      <Typography color="textSecondary" variant="body2">
                        Status: {post.status}
                      </Typography>
                      <Typography variant="h5">
                        {post.price}
                      </Typography>
                    </div>
                    <Typography variant="subtitle1" className={styles.postItem__content}>
                      {post.content}
                    </Typography>
                    <Typography variant="subtitle1" className={styles.postItem__content}>
                      Contact
                      <div>
                        <FontAwesomeIcon icon={faAt} className={styles.icon}/> {post.email}<br/>
                        <FontAwesomeIcon icon={faPhoneAlt} className={styles.icon}/> {post.phone}<br/>
                        <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.icon}/> {post.location}
                      </div>
                    </Typography>
                    <Typography color="textSecondary" variant="body2" className={styles.postItem__content}>
                      <span>Publication: {post.datePublication}</span>
                      <span>Updated: {post.dateLastUpdate}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </StatusContext.Consumer>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
  props: PropTypes.object,
  params: PropTypes.object,
  post: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fetchOnePost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  post: getPost(state),
});

const mapDispatchToProps =( dispatch, props) => ({
  fetchOnePost: () => dispatch(fetchPost(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
