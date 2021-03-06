import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatusContext from '../../../context/StatusContex';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { connect } from 'react-redux';
import { getAll, addPost } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

class Component extends React.Component {
  state = {
    post: {
      id: '',
      title: '',
      content: '',
      price: '',
      image: '',
      email: '',
      location: '',
      phone: '',
      status: 'published',
      datePublication: '',
      dateLastUpdate: '',
    },
  };

  handleChange = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: event.target.value } });
    // console.log('this.state', this.state);
  };

  handleImage = (file) => {
    const { post } = this.state;

    if (file) this.setState({ post: { ...post, [post.image]: file[0] } });
    else this.setState({ post: { ...post, image: null } });
  }

  submitForm = (event) => {
    event.preventDefault();
    const { post } = this.state;
    const { addPost } = this.props;

    if((post.title.length > 9) && (post.content.length > 19) && post.email) {
      post.id = uuidv4();
      post.datePublication = new Date().toISOString();
      post.dateLastUpdate = post.datePublication;
      addPost(post);

      this.setState({
        post: {
          id: '',
          title: '',
          content: '',
          price: '',
          image: '',
          email: '',
          location: '',
          phone: '',
          status: '',
          datePublication: '',
          dateLastUpdate: '',
        },
      });
    } else {
      alert('Please fill required fields');
    }
  };

  render() {
    const {className } = this.props;
    const { post } = this.state;

    return(
      <StatusContext.Consumer>
        {value => (
          <div className={clsx(className, styles.root)}>
            <h2>Add new post</h2>
            <Grid container spacing={3} className={styles.addContainer} justify="center">
              <Grid item xs={12} sm={9}>
                {value.status
                  ?
                  <Paper className={styles.paperCard}>
                    <form onSubmit={this.submitForm}>
                      <Typography variant="h6" gutterBottom align="center">
                        Fill in the form
                      </Typography>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField required name="title" label="Title" fullWidth onChange={this.handleChange} helperText="min. 10 characters"/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField required name="content" label="Describe" fullWidth multiline onChange={this.handleChange} helperText="min. 20 characters"/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField required name="price" label="Price ($)" fullWidth type="number" onChange={this.handleChange}/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField required name="email" label="Email address" fullWidth onChange={this.handleChange} />
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField name="phone" label="Phone number" fullWidth type="number" onChange={this.handleChange}/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <TextField name="location" label="Localization" fullWidth onChange={this.handleChange}/>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <FormControl required fullWidth variant="filled">
                          <InputLabel id="demo-simple-select-label">Status</InputLabel>
                          <Select labelId="demo-simple-select-label" fullWidth name="status" value={post.status} onChange={this.handleChange} >
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="published">Published</MenuItem>
                            <MenuItem value="finished">Finished</MenuItem>
                          </Select>
                        </FormControl>
                        <FormHelperText>Choose status your announcement</FormHelperText>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                        <Typography variant="body1" gutterBottom align="center">
                          Add photo
                        </Typography>
                        <label className={styles.file}>
                          <input type="file" name="image" accept="image/*" onChange={this.handleImage}></input>
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={9} className={styles.paperCard__item} align="center">
                        <Button variant="outlined" type="submit" color="secondary" className={styles.paperCard__btn}>
                          Submit
                        </Button>
                      </Grid>
                    </form>
                  </Paper>
                  :
                  <Paper className={styles.paperCard}>
                    <h2 className={styles.paperCard__textError}>Only for logged user</h2>
                    <p>
                      <Link className={styles.paperCard__link}>Login</Link>
                    </p>
                    <p>
                      <Link to={'/'} className={styles.paperCard__link}>Back to homepage</Link>
                    </p>
                  </Paper>
                }
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
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: (post) => dispatch(addPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
