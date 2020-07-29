import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components create update delete
import Home from './components/home';
import Home2 from './components/home2';
import Home3 from './components/home3';
import Home4 from './components/home4';
// component setting
import Setting from './components/setting';
//component login
import Login from './components/login';

// drawer 
//import Navigator from './navigator/navigator';

//css
import './App.css';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphqlChatime'
});


class App extends Component {


  state = {
    modalVisible: false,
    theme: localStorage.getItem('theme') === null ? '#b768a2' : localStorage.getItem('theme'),
    mail: '',
    password: ''
  };

  setModalVisible = (visible) => {

    this.setState({ modalVisible: visible });
    window.history.replaceState(null, "New Page Title", "/")
    window.location.reload(false);
  }

  setTheme = (e) => {
    this.setState({ theme: e })
  }

  setLogin = (e, x) => {
    console.log(e, x)
    this.setState({ mail: e, password: x });
  }


  render() {

    return (
      <ApolloProvider client={client}>
        <div style={appContainer}>

          <style type="text/css">{`
            @font-face {
              font-family: 'MaterialIcons';
              src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
            }

            @font-face {
              font-family: 'FontAwesome';
              src: url(${require('react-native-vector-icons/Fonts/FontAwesome.ttf')}) format('truetype');
            }
          `}
          </style>

          <div>

            <Header
              leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.setModalVisible(!this.state.modalVisible) }}
              centerComponent={{ text: 'CHATIME', style: { color: '#fff', fontSize: 25 } }}
              rightComponent={{ icon: 'home', color: '#fff', onPress: () => this.setModalVisible(!this.state.modalVisible) }}
              containerStyle={{
                backgroundColor: `${this.state.theme}`
              }}
            />

            <Router>
              <Switch>
                <Route exact path="/" render={(props) => <Home {...props} theme={this.state.theme} mail={this.state.mail} password={this.state.password} />} />
                <Route path="/login" render={(props) => <Login {...props} setLogin={this.setLogin} />} />
                <Route path="/add" render={(props) => <Home2 {...props} />} />
                <Route path="/delete" render={(props) => <Home3 {...props} />} />
                <Route path="/update" render={(props) => <Home4 {...props} />} />
                <Route path="/setting" render={(props) => <Setting {...props} set={this.setTheme} />} />
              </Switch>
            </Router>



          </div>
        </div>
      </ApolloProvider>
    );
  }
}

const appContainer = {
  marginLeft: "10%",
  marginRight: "10%"
};


export default App;
