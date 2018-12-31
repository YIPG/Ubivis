import React from 'react';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import UserCard from '../../components/Card';
import {
    fetchUserList
} from '../../actions';

const styles = theme => ({
    progress: {
        marginTop: theme.spacing.unit * 4
    }
})

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchUserList(this.props.male)
    }

    renderCard(){
        const {classes} = this.props;
        const {fetchUserList, loading} = this.props.main;

        if(loading){
            return <CircularProgress className={classes.progress} size={30} color="secondary" />
        }
        return fetchUserList.map(fetchedUser =>  {
            // console.log(fetchedUser);
            return (
                <li
                    key={fetchedUser.id}
                >
                {fetchUserList.data.name}
                    {/* <UserCard
                        name={fetchUserList.data.name}
                        profile={fetchUserList.data.profile}
                        img_src={fetchUserList.data.profileImageURL} */}
                    />
                </li>
            )
        })
    }

    render(){
        return(
            <div>
                <ul>
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
    fetchUserList
})(
    withStyles(styles)(Main)
);