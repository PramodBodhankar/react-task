import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import PopupComponent from '../popup/popup.jsx';
class ListComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state ={
            searchText:'',
            list:[],
            currentPageRecords: [],
            showConfirmation:false,
            confirmationMsg:'',
            duplicateError:false,
            deleteFrndObj:null,
            pages:[],
            currentpage: 1
        }
        console.log(props.friendsList)
    }

    componentDidUpdate(prevProps)
    {
       if(prevProps.friendsList.length != this.props.friendsList.length)
       {
            this.setListData(this.state.searchText);
       }
    }

    setListData(searchText)
    {
        let filteredList = this.props.friendsList;
        if(searchText)
        {
            filteredList = this.props.friendsList.filter((frnd) => frnd.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        }
        filteredList = filteredList.sort((a,b)=> {
            if(a.isFavorite && !b.isFavorite){
                return -1;
            }
            else if(!a.isFavorite && b.isFavorite)
            {
                return 1;
            }
        });
        let currentPageRecords = filteredList;
        let pages = [];
        if(filteredList.length > 4)
        {
            let pagesCount = Math.ceil(filteredList.length/4);
            for(let i=0;i<pagesCount;i++)
            {
                pages.push(i+1);
            }
            let start = (this.state.currentpage -1) * 4;
            let end = start + 4;
            currentPageRecords = filteredList.slice(start,end);
        }
        this.setState({list:filteredList, currentPageRecords, pages});
    }


    searchTextChange(e)
    {
        let text = e.target.value;
        this.setListData(text);
        this.setState({searchText:text});
    }

    setFavorite(index)
    {
        let listIndex = (this.state.currentpage - 1)*4+index;
        let listCopy = this.state.list;
        listCopy[listIndex].isFavorite = !listCopy[listIndex].isFavorite;
        this.setState({list:listCopy},()=>{
            this.setListData(this.state.searchText);
        });
    }


    checkAndAdd(e)
    {
        const frndName = e.target.value;
        if((e.key === 'Enter' || e.keyCode === 13) && frndName.trim())
        {
            const index = this.props.friendsList.findIndex((frnd)=>frnd.name.toLowerCase() === frndName.toLowerCase());
            if(index > -1)
            {
                this.setState({
                    duplicateError:true
                });
            }
            else
            {
                this.props.onAddFriend();
            }
        }
        else
        {
            if(this.state.duplicateError)
            {
                this.setState({duplicateError:false});
            }
        }
    }

    onPageChange(pageNumber)
    {
        this.setState({currentpage:pageNumber},()=>{
            this.setListData();
        })
    }

    onDeleteFrnd()
    {
        if(this.state.deleteFrndObj)
        {
            this.props.onDelete(this.state.deleteFrndObj);
        }
       this.hideConfirmation();
    }

    showDeleteConfirmation(frnd)
    {
        let msg = 'Are you sure? Do you want to delete '+ frnd.name+' from list?';
        this.setState({
            showConfirmation:true,
            deleteFrndObj:frnd,
            confirmationMsg:msg
        });
    }

    hideConfirmation()
    {
        this.setState({
            showConfirmation:false,
            confirmationMsg:'',
            deleteFrndObj:null
        });
    }

    render(){
        console.log(this.props);
        const classname= 'page-btn px-3';
        return (
            <div className="list-container">
                <div className="justify-content-between list-header m-0 px-3 py-3 row">
                    <span className="list-label">Friends List</span>
                    <div className="search-wrapper">
                        <input type="text" placeholder={'Search Friend'} value={this.state.searchText} onChange={(e)=> this.searchTextChange(e)} />
                    </div>
                </div>
                <div className="list-add-row row m-0 p-2">
                    <div className="add-input-wrapper w-100">
                        <input className="w-100" type="text" placeholder={'Enter your friends name'} onKeyUp={(e)=> this.checkAndAdd(e)} />
                    </div>
                    {this.state.duplicateError ? <div className="error-label">Friend with same name already exist</div> : null}
                </div>
                {this.state.currentPageRecords.map((frnd,index)=>{
                    return(
                        <div key={frnd.name+index} className="list-item-row row m-0 px-3 py-2 justify-content-between">
                            <div className="name-details">
                                <span className="frnd-name">{frnd.name}</span>
                                <p className="frnd-label m-0">is your friend</p>
                            </div>
                            <div className="align-items-center btns-wrapper d-flex">
                                <div className="align-items-center border d-flex favorite-btn rounded px-3 py-2 mr-3" onClick={this.setFavorite.bind(this,index)}>
                                    {
                                        frnd.isFavorite ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                    </svg>
                                    }
                                </div>
                                <div className="align-items-center border d-flex rounded px-3 py-2 delete-btn" onClick={this.showDeleteConfirmation.bind(this,frnd)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {
                    this.state.pages.length ? <div className="justify-content-end m-0 pagination-row px-3 py-2 row">
                            <div className="pagination-btns-wrapper d-flex">
                            {this.state.pages.map((page)=>{
                                return (
                                    
                                    <div key={'page-'+page} className={this.state.currentpage === page ? classname+' active' : classname} onClick={this.onPageChange.bind(this,page)} >
                                        <span>{page}</span>
                                    </div>
                                )
                            })}
                        </div> </div> : null
                }
                <PopupComponent open={this.state.showConfirmation} message={this.state.confirmationMsg} onClose={this.hideConfirmation.bind(this)} onConfirm={this.onDeleteFrnd.bind(this)}></PopupComponent>
            </div>
        );
    }
}
export default ListComponent;