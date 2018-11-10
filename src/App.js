import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUsername: '',
    }
    this.onUsernameSumbitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username){
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username}),
    }).then(response => {
      this.setState({currentUsername: username});
    }).catch(error => console.log('error', error));
  }


  render() {
    return <UsernameForm onSumbit={this.onUsernameSubmitted} />
  }
}

export default App
