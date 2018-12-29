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
    },
    formControl: {
      margin: '0 auto',
      minWidth: 150,
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

let age_list = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
  
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
        let options = age_list.map(age => {
            return <option key={age} value={age}>{age}</option>
        } )

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
                    {options}
                    
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