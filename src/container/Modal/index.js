import React from 'react';
import { connect } from 'react-redux';
import {
  phoneChanged
} from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaskedInput from 'react-text-mask';

const styles = theme => ({
    container: {
      marginTop: theme.spacing.unit *2
    },
    formControl: {
      // margin: theme.spacing.unit,
      minWidth: 60,
    },
  });

function TextMaskCustom(props){
  const { inputRef, ...other} = props;
  
  return(
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement: null);
      }}
      mask={[/\d/,/\d/,/\d/,' ', /\d/,/\d/,/\d/,/\d/,' ', /\d/,/\d/,/\d/,/\d/]}
      showMask
      placeholderChar={'\u2000'}
    />
  )
}

class FormDialog extends React.Component {
  state = {
    open: false,
    age: 10
  };

  handleChange= (e) => {
    this.props.phoneChanged(e.target.value.replace(/\s+/g, ""))
  }

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
            <div className={classes.container}>
              <TextField
                  onChange={this.handleChange.bind(this)}
                  autoFocus
                  id="name"
                  fullWidth
                  helperText="例: 090 1234 5678"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }}
              />
            </div>
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

const mapStateToProps = state => {
  return state.profile;
};

export default withStyles(styles)(
  connect(mapStateToProps, {
    phoneChanged
  })(FormDialog)
)