import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { nameChanged, profileChanged, snackChanged, profileImageChanged } from '../../actions';
import SimpleSnackbar from '../../components/SimpleSnackbar';

const styles = theme => ({
    close: {
      padding: theme.spacing.unit / 2,
    },
    nameform: {
        marginTop:  theme.spacing.unit * 2,
        width: 150,
    },
    textform: {
        marginTop:  theme.spacing.unit * 5,
        width: 300,
    }
});

// const dropzoneStyle = {
//     width: 160,
//     height: 160,
//     margin: 20,
//     border: '2px dashed #ccc'
// }

// const onImageDropzoneStyle = {
//     width: 500,
//     height: 160,
//     margin: 20,
//     border: 'none',
//     textAlign: 'center'
// }

// const imageStyle = {
//     height: 160
// }

const maxImageSize=5242880; //5MB

class Prof extends Component {
    constructor() {
        super()
        this.state = {
          accepted: [],
          rejected: [],
          imgSrc: null
        }
    }

    onUpload = (accepted, rejected) => {
        accepted.forEach(f => {
          this.props.imageUploaded(f);
        });
    };

    verifyFile = (files) => {
        if(files && files.length>0){
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            if ((currentFileType !== "image/jpeg") && (currentFileType !== "image/png")){
                this.props.snackChanged('アップロードできるファイルはjpeg形式もしくはpng形式のみです。');
                console.log(currentFileType);
                return <SimpleSnackbar />
            }
            if(currentFileSize > maxImageSize){
                this.props.snackChanged('ファイル容量が大きすぎます。上限は5MBです。');
                return <SimpleSnackbar />
            }
        }
    }


    handleOnDrop = (files, rejected) => {
        this.props.profileImageChanged(files[0]);

        if(rejected && rejected.length > 0){
            this.props.snackChanged('対応していないファイルです。');
            return <SimpleSnackbar />
        }

        if(files && files.length > 0){
            this.verifyFile(files);

            const currentFile = files[0];
            const reader = new FileReader();

            reader.addEventListener('load', ()=>{
                
                this.setState({
                    imgSrc: reader.result
                })
            }, false);
            reader.readAsDataURL(currentFile);
        }
    }


    onNameChange(text) {
        this.props.nameChanged(text.target.value);
    }

    onProfileChange(text) {
        this.props.profileChanged(text.target.value)

    }

    render() {
        // const {imgSrc} = this.state;
        const { classes } = this.props;

        return (
            
            <Grid
                container
                direction='column'
                alignItems='center'
            >
                {/* <Dropzone
                    style={imgSrc!==null ? onImageDropzoneStyle: dropzoneStyle}
                    accept="image/*"
                    onDrop={this.handleOnDrop}
                >
                <div>
                    {imgSrc !== null ? <img alt='' style={imageStyle} src={imgSrc} />: ''}
                </div>
                </Dropzone> */}
                
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
    // console.log(state.auth)
    return state.profile;
};

export default withStyles(styles)(
    connect(mapStateToProps, {
        nameChanged,
        profileChanged,
        snackChanged,
        profileImageChanged
    })(
        Prof
));
