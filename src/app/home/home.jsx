import React, { Component } from 'react';
import ListComponent from '../list/list.jsx';
class HomePage extends Component {
    constructor(props)
    {
        super(props);
    }

    componentDidMount(){
        this.props.fetchFriends();
    }

    addToList(name){
        this.props.addToList(name);
    }

    onDelete(frnd)
    {
        this.props.removeFromList(frnd);
    }

    render(){
        console.log(this.props);
        return (
            <div className="align-items-center d-flex home-page-container justify-content-center">
                <ListComponent friendsList={this.props.friendsList} onAddFriend={this.addToList.bind(this)} onDelete={this.onDelete.bind(this)} ></ListComponent>
            </div>
        );
    }
}
export default HomePage;