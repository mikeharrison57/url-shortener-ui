import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const newUrl = {
      id: Date.now(),
      title: this.state.title,
      long_url: this.state.urlToShorten
    }
    if (this.state.title && this.state.urlToShorten) {
      this.props.addUrl(newUrl)
      this.clearInputs();
    } else {
      alert('Please fill out both fields')
    }
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
          required
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
          required
        />
        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
