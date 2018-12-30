import React from 'react';
import {connect} from 'react-redux';
import ImgMediaCard from './Card';
import {
    fetchUserList
} from '../../actions';

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchUserList(male)
    }

    // renderCard(){
    //     const {fetchUserList} = main;
    //     return fetchUserList.map(fetchedUser =>  {
    //         return (
    //             <li
                
    //             >
    //                 none
    //             </li>
    //         )
    //     })
    // }

    render(){
        const {fetchUserList} = main ;
        return(
            <div>
                {/* fetchUserList.forEach(fetchedUser => {
                    <ImgMediaCard targetUid={fetchedUser.id} />
                }); */}
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     male: state.profile.male,
//     fetchedUserList: state.main.
// });

export default connect(mapStateToProps, {
    fetchUserList
})(Main);