import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import UserCard from '../../components/Card';
import {
    fetchUserList,
    deleteUserFromList,
    InitializeUserList
} from '../../actions';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    ul:{
        paddingLeft: '0'
    },
    progress: {
        marginTop: theme.spacing.unit * 20
    },
    list: {
        listStyleType: "none",
        margin: '8px'
    }
})

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchUserList(this.props.male)
    }

    componentWillUnmount(){
        this.props.InitializeUserList();
    }

    renderCard(){
        const {classes, deleteUserFromList} = this.props;
        const {fetchUserList, loading} = this.props.main;

        if(loading){
            return <CircularProgress className={classes.progress} size={60} />
        }
        return _.map(fetchUserList,fetchedUser =>  {
            if(fetchedUser.show){
                return (
                    <li
                        className={classes.list}
                        key={fetchedUser.id}
                    >
                        <UserCard
                            deleteUser={() => deleteUserFromList(fetchedUser.id)}
                            name={fetchedUser.data.name}
                            profile={fetchedUser.data.profile}
                            img_src={fetchedUser.data.profileImageURL}
                        />
                    </li>
                )
            }
        })
    }

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <ul className={classes.ul}>
                    {this.renderCard()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        male: state.profile.male,
        main: state.main
    })
}

export default connect(mapStateToProps, {
    fetchUserList,
    deleteUserFromList,
    InitializeUserList
})(
    withStyles(styles)(Main)
);