import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CameraAlt from '@material-ui/icons/CameraAlt';
import { nameChanged, profileChanged, profileImageChanged, profileGet, profileFinish } from '../../actions';
// import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    circularprogress :{
        marginTop: theme.spacing.unit * 20
    },
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
        objectFit: 'contain',
        width: 160,
        height: 160,
    },
    icon: {
        fontSize: 80,
        color: theme.palette.grey[500]
      },
    font: {
        color: theme.palette.grey[500]
    },
    button: {
        marginTop: theme.spacing.unit * 3
    }
});

class Prof extends Component {
    state = {
        edit: false,
        imageUpdated: false
    }

    componentDidMount(){
        this.props.profileGet(this.props.user.uid)
    }

    onNameChange(text) {
        this.props.nameChanged(text.target.value);
    }

    onProfileChange(text) {
        this.props.profileChanged(text.target.value)
    }

    renderButton(){
        if(this.props.profile.updateLoading){
            return <CircularProgress size={30} className={this.props.classes.button} />
        }
        return this.state.edit && 
            <Button
                variant="outlined"
                onClick={this.handleFinish.bind(this)}
                className={this.props.classes.button}
                color="primary"
            >
                完了する
            </Button>
        
    }

    handleChange(e){
        this.setState({
            imageUpdated: true
        });
        const files = e.target.files;
        if(files.length !== 0) {
            this.props.profileImageChanged(files[0])
        }
    }

    handleFinish(){
        const{male, age, region, name, profile, profileImage} = this.props.profile;

        this.props.profileFinish({male, age, region, name, profile, profileImage});
        this.setState({edit: !this.state.edit}) ;
    }

    render() {
        const { classes, profile } = this.props;
        const { profileImage } = profile;

        let img_src = profile.loading? "": profile.profileImageURL;
        let updated_image_src =  this.state.imageUpdated? URL.createObjectURL(profileImage):"";

        if(profile.loading){
            return (
                <div className={classes.root}>
                    <CircularProgress className={classes.circularprogress} size={60} />
                </div>
            )
        }
        return (
            <div
                className={classes.root}
            >
                <label className={profile.loading?classes.inputZone:classes.inputZoneOnImage}>
                    {profile.loading ? 
                        <div className={classes.inputZoneIntro}>
                        <CameraAlt className={classes.icon} />
                        <Typography variant="caption" className={classes.font}>必須</Typography>
                        </div>:
                        <img className={classes.imageZone} alt="" src={this.state.imageUpdated ? updated_image_src :img_src} />
                    }
                    <input 
                        disabled={!this.state.edit}
                        type="file"
                        accept="image/*"
                        onChange={this.handleChange.bind(this)}
                        style={{display: 'none'}} 
                    />
                </label>
                
                <TextField
                    disabled={!this.state.edit}
                    className={classes.nameform}
                    label='名前'
                    value={profile.name}
                    onChange={this.onNameChange.bind(this)}
                    autoFocus
                />
                <TextField
                    disabled={!this.state.edit}
                    className={classes.textform}
                    id="outlined-multiline-flexible"
                    label='プロフィール'
                    multiline
                    onChange={this.onProfileChange.bind(this)}
                    value={this.props.profile.profile}
                    rows="8"
                    rowsMax="15"
                    margin="normal"
                    helperText="例:ギターが好きです！身長は170cmです！"
                    variant="outlined"
                />
                <Button
                    variant="outlined"
                    onClick={() => this.setState({
                        edit: !this.state.edit
                    })} 
                    className={classes.button}
                    color="default"
                >
                    {this.state.edit ? "キャンセル" :"編集する"}
                </Button>
                {this.renderButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile,
        user: state.auth.user
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, {
        nameChanged,
        profileChanged,
        profileImageChanged,
        profileGet,
        profileFinish
    })(
        Prof
));
