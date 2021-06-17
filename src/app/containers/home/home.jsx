import { connect } from 'react-redux';
import HomePage from '../../home/home.jsx'
import { fetchFriends,addToList, removeFromList } from './actions';
const mapStateToProps = (state) => {
    return {        
        friendsList: state.home && state.home.friendsList ? state.home.friendsList : []
    };
};
const mapsDispatchToProps = (dispatch) => {
    return {
        fetchFriends: () => dispatch(fetchFriends()),
        addToList: (name)=> dispatch(addToList(name)),
        removeFromList: (frnd)=>dispatch(removeFromList(frnd)),
    };
};
export default connect(mapStateToProps, mapsDispatchToProps)(HomePage);