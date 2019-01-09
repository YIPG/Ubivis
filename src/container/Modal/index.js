import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'noWrap',
      marginTop: theme.spacing.unit
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 60,
    },
  });

class FormDialog extends React.Component {
  state = {
    open: false,
    age: 10
  };

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">電話番号登録のお願い</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ubivisでは本人確認のために電話番号の認証をお願いしております。
            </DialogContentText>
            <form className={classes.container}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">国</InputLabel>
                        <Select
                            value={this.state.age}
                            onChange={this.handleChange('age')}
                            input={<Input id="age-simple" />}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                            <MenuItem value={10}>+81</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        autoFocus
                        id="name"
                        label='電話番号'
                        placeholder="90-1234-5678"
                        type="email"
                    />
                </FormControl>
            </form>
          </DialogContent>
          <DialogActions style={{ marginBottom: 20, marginRight:10}}>
            <Button onClick={this.handleClose} color="primary">
              キャンセル
            </Button>
            <Button variant="contained" onClick={this.handleClose} color="primary">
              認証する
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormDialog)