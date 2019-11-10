import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import AddContact from "./components/AddContact";
import Users from "./components/Users";

class App extends Component {
  state = {
    users: [],
    showUserList: false
  }

  back = () => this.setState({showUserList: false});

  handleUserList = () => this.setState({ showUserList: true });

  addUser = (user) => {
    // console.log(user);
    user.id = Math.random();
    let users = [user];
    try {
      //users = JSON.stringify(users);
      if (localStorage && localStorage.getItem('userData')) {
        let oldData = JSON.parse(localStorage.getItem('userData'));
          oldData.push(users[0]);
          localStorage.setItem('userData', JSON.stringify(oldData));
          this.handleUserList();
      } else {
        localStorage.setItem('userData', JSON.stringify(users));
      }
    } catch(error) {
      console.log("some error occured", error);
    }
  }
  render () {
    return (
      <div className="App">
        <div className="container is-fluid" style={{padding: '32px'}}>
          {
            this.state.showUserList ? 
              (<Users users={JSON.parse(localStorage.getItem('userData'))} back={this.back}/>) 
            : (<AddContact addUser={this.addUser} showUserList={this.handleUserList} />)}
            
          </div>
      </div>
    );
  }
}

export default App;
