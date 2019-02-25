import React from 'react';
import { Button } from 'react-materialize';
import axios from 'axios';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      eventID: this.props.eventID, 
      comment: '', //this is the value from the field
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }
  handleCommentChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //put in an ajax request to the server to store the data in the database
    console.log(this.state);
    if (!this.state.username) {
      console.log('Please Login to post a comment')
    }
    else {
      const { comment, eventID} = this.state;
      const params = {
        body: comment,
      }
      axios.put(`/events/${eventID}/comments`, params)
      .then((response) => { 
        // need to set the view back to the event Page and hopefully trigger a re-rendering
        console.log(response)} )
    }
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>        
        <span>Comment</span>
        <input type="text" placeholder="Say something..."  value={this.state.comment} className="form-control" onChange={ this.handleCommentChange }/>
        <Button type="submit" className="btn btn-primary"> Post Comment! </Button>
      </form>
    );
  }
}

export default CommentForm;
