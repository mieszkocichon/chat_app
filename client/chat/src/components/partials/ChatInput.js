import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ChatInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }
    }

    sendMessage = (e) => {
        e.preventDefault();

        const message = {
            threadId: this.props.match.params.threadId,
            userId: this.props.user.id,
            content: this.state.content,
            date: new Date()
        }

        this.props.socket.send(
            JSON.stringify({
                type: 'ADD_MESSAGE',
                data: {
                    threadId: message.threadId,
                    message
                }
            })
        )

        this.setState({
            content: ''
        })
    }

    render() {
        return (
            <form className="input-view" onSubmit={e => this.sendMessage(e)}>

                <div className="input-group">

                    <div className="input-view">
                        <input 
                            type="text" 
                            placeholder="Write your message" 
                            className="form-control chat-input-message" 
                            value={this.state.content} 
                            onChange={e => this.setState({content: e.target.value})} 
                        />
                    </div>

                    <button className="btn btn-send input-group-append button-message-send">
                        <i className="zmdi zmdi-mail-send"></i>
                    </button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    ...state.account,
    ...state.chat
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ChatInput));
