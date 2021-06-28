import React from 'react';
import PropTypes from 'prop-types';

import StatusContext from '../../../context/StatusContex';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';

// import { connect } from 'react-redux';
import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';

const Component = ({ className, postsAll }) => {

  return (
    <StatusContext.Consumer>
      { value => (
        <div className={clsx(className, styles.root)}>
          <div className={styles.announcement}>
          </div>
          <div className={styles.card}>
            {postsAll.map(post => (
              <Card key={post.id} className={styles.card__item}>
                <CardActionArea href={`/post/${post.id}`}>
                  <CardMedia
                    className={styles.image}
                    component="img"
                    image={post.image}
                    title={post.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {post.content}
                    </Typography>
                    <div className={styles.price}>
                      <Typography component="p" variant="subtitle2">Price: {post.price}</Typography>
                      <Typography component="p" variant="subtitle2">Location: {post.location}</Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
                <CardActions className={styles.card__btn}>
                  <Button size="small" color="primary" href={`/post/${post.id}`}>
                    Show more
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      )}
    </StatusContext.Consumer>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  postsAll: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  status: PropTypes.bool,
  state: PropTypes.bool,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};