import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { regionChanged } from '../../actions';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

class Region extends React.Component {
    state = {
      name:'東京都',
    };
  
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });

      this.props.regionChanged(event.target.value);
    };
  
    render() {
      const { classes } = this.props;
  
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="都道府県"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          </form>
    );
  }
}

Region.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    // console.log(state.auth)
    return state.profile;
};

export default withStyles(styles)(connect(mapStateToProps, { regionChanged })(Region));