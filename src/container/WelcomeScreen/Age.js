import React from 'react';
import { connect }　from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { ageChanged } from '../../actions';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });
  
class AgeSelects extends React.Component {
    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        const {ageChanged} = this.props;

        ageChanged(event.target.value);
    };


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">年齢</InputLabel>
                <Select
                    native
                    value={this.state.age}
                    onChange={this.handleChange('age')}
                    inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                    }}
                >
                    <option value="" />
                    <option value={0}>18~20歳</option>
                    <option value={1}>21~23歳</option>
                    <option value={2}>24~26歳</option>
                    <option value={3}>27~30歳</option>
                    <option value={4}>31~33歳</option>
                    <option value={5}>34~36歳</option>
                    <option value={6}>37~40歳</option>
                </Select>
                </FormControl>
            </div>
        );
    };
}

AgeSelects.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = state => {
// console.log(state.auth)
return state.profile;
};
  
export default withStyles(styles)(connect(mapStateToProps, {ageChanged})(AgeSelects));