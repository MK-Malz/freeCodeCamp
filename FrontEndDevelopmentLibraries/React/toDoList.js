class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
  }
  // Add handleChange() and submitMessage() methods here
  
  
  handleChange(event) {
      this.setState({input: event.target.value});
  }

  submitMessage() {
      //concatenate the current message (stored in input) to the messages array in local state, and clear the value of the input.
      this.setState({messages: this.state.messages.concat(this.state.input)});
      this.setState({input: ''});
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* Render an input, button, and ul below this line */ }
        <input value={this.state.input} onChange={this.handleChange}/>
        <button onClick={this.submitMessage}>Add message</button>
        <ul>
            {this.state.messages.map(x => <li key={x}>{x}</li>)}
        </ul>
        { /* Change code above this line */ }
      </div>
    );
  }
};
