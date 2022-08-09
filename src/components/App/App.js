import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

// https://source.unsplash.com/user/wsanter

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount() {
    getUrls()
      .then((data) => {
        this.setState({urls: data.urls})
      })
      .catch((err) => {
        console.log(err)
        this.setState({error: 'Sorry, were having some Techical Difficulties right now. Please come visit us later!'})
      })
  }

  addUrl = newUrl => {
    postUrls(newUrl)
    .then((data) => {
      console.log(data)
      this.setState({urls: [...this.state.urls, data]})
    })
    .catch((err) => {
      console.log(err)
      this.setState({error: 'Sorry, were having some Techical Difficulties right now. Please come visit us later!'})
    })
  }

  render() {
    return (
      <>
        {this.state.error ? <h1 style={{textAlign: 'center'}}>{this.state.error}</h1> : 
          <main className="App">
            <header>
              <h1>URL Shortener</h1>
              <UrlForm addUrl={this.addUrl} />
            </header>
            <UrlContainer urls={this.state.urls}/>
          </main>
        }
      </>
    );
  }
}

export default App;
