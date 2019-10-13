import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import apiKey from './config.js';
import logo from './logo.svg';

import Navigation from './Nav';
import SearchForm from './SearchForm';
import PhotoContainer from './PhotoContainer';

class App extends Component {

  state = {
    cats: [],
    query: '',
    loading: true
  };

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'cats') => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          cats: responseData.photos.photo,
          query: query,
          loading: false
        });
      })
      .catch(error => console.log('Error fetching and parsing data,', error));
  }

  render() {
    // forEach
    console.log(this.state.query)
    return (
      <BrowserRouter>
        <div className="container">

          <SearchForm onSearch={this.performSearch}/>
          <Navigation />
          <PhotoContainer data={this.state.cats} query={this.state.query} loading={this.state.loading}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
