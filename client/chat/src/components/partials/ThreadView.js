import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Message from './Message';

class ThreadView extends Component {

    init = () => {
        let currentThread = this.props.threads.filter(t => t.id === this.props.match.params.threadId)[0];

        if (currentThread && this.props.socket.readyState) {
            let skip = currentThread.Messages || 0;
            this.props.socket.send(
                JSON.stringify({
                    type: 'THREAD_LOAD',
                    data: {
                        threadId: this.props.match.params.threadId,
                        skip,
                    }
                })
            )
        }
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(props) {
        if (props.match.params.threadId !== this.props.match.params.threadId) {
            this.init();
        }
    }

    render() {
        return (
            <div className="main-view" id="main-view">
                {
                    this.props.threads.filter(thread => thread.id === this.props.match.params.threadId).map((thread, threadId) => {
                        return (
                            <div className="message-container" key={threadId}>
                                {
                                    thread.Messages.map((message, id) => {
                                        return (
                                            <Message msg={message} key={id} profile={thread.profiles.filter(p => p.id === message.userId)[0]} />
                                        )
                                    }
                                )}
                            </div>
                        )
                    }
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ThreadView));
