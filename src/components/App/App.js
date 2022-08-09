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
        this.setState({error: 'Techical Difficulties'})
      })
  }

  addUrl = newUrl => {
    this.setState({urls: [...this.state.urls, newUrl]})
    postUrls(newUrl)
  }

  render() {
    return (
      <main className="App">
        {/* {console.log(this.state.urls)} */}
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
