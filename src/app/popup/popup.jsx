import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
class PopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    closeModal()
    {
        this.props.onClose();
    }

    render() {
        return (
            <Popup
                modal
                open={this.props.open}
                closeOnDocumentClick={false}
                position="top center"
                className="confirm-popup"
            >
                {
                    <div className="popup-body">
                        <div className="justify-content-end m-0 pop-up-close-wrapper row">
                            <div className="pop-up-close" onClick={this.closeModal.bind(this)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="row popup-title d-flex justify-content-center mb-4">
                            {/* Do want to remove rush services to the product list ? */}
                            {this.props.message}
                        </div>
                        <div className="d-flex justify-content-center popup-footer-btns row m-0 mb-4">
                            <div className="d-flex footer-btn-wrapper">
                                <div className="custom-btn mr-3 px-3 py-1 rounded" onClick={this.props.onClose}>
                                    <span>Cancel</span>
                                </div>
                                <div className="custom-btn px-3 py-1 rounded" onClick={this.props.onConfirm}>
                                    <span>Confirm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Popup>
        );
    }
}
export default PopupComponent;