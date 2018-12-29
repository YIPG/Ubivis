import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CameraAlt from '@material-ui/icons/CameraAlt';
import { nameChanged, profileChanged, profileImageChanged } from '../../actions';

const styles = theme => ({
    nameform: {
        marginTop:  theme.spacing.unit * 2,
        width: 150,
    },
    textform: {
        marginTop:  theme.spacing.unit * 5,
        width: 300,
    },
    inputZone : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        height: 160,
        margin: '20px 0',
        border: `2px dashed ${theme.palette.grey[400]}`
    },
    inputZoneIntro: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputZoneOnImage : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        height: 160,
        margin: '20px 0',
        border: `1px ${theme.palette.grey[400]}`
    },
    imageZone : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: 160,
        height: 160,
    },
    icon: {
        fontSize: 80,
        color: theme.palette.grey[500]
      },
    font: {
        color: theme.palette.grey[500]
    },
});

class Prof extends Component {
    onNameChange(text) {
        this.props.nameChanged(text.target.value);
    }

    onProfileChange(text) {
        this.props.profileChanged(text.target.value)
    }

    handleChange(e){
        const files = e.target.files;
        if(files.length !== 0) {
            this.props.profileImageChanged(files[0])
        }
    }

    render() {
        const { classes, profileImage } = this.props;
        let img_src = profileImage === null ? "" : URL.createObjectURL(profileImage);

        return (
            <Grid
                container
                direction='column'
                alignItems='center'
            >
                <label className={profileImage===null?classes.inputZone:classes.inputZoneOnImage}>
                    {profileImage === null ? 
                        <div className={classes.inputZoneIntro}>
                        <CameraAlt className={classes.icon} />
                        <Typography variant="caption" className={classes.font}>必須</Typography>
                        </div>:
                        <img className={classes.imageZone} alt="" src={img_src} />
                    }
                    <input type="file" accept="image/*" onChange={this.handleChange.bind(this)}　style={{display: 'none'}} />
                </label>
                
                <TextField
                    className={classes.nameform}
                    label='名前'
                    value={this.props.name}
                    onChange={this.onNameChange.bind(this)}
                    autoFocus
                />
                <TextField
                    className={classes.textform}
                    id="outlined-multiline-flexible"
                    label='プロフィール'
                    multiline
                    onChange={this.onProfileChange.bind(this)}
                    value={this.props.profile}
                    rows="8"
                    rowsMax="15"
                    margin="normal"
                    helperText="例:ギターが好きです！身長は170cmです！"
                    variant="outlined"
                />
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return state.profile;
};

export default withStyles(styles)(
    connect(mapStateToProps, {
        nameChanged,
        profileChanged,
        profileImageChanged
    })(
        Prof
));
