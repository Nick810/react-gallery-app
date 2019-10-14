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
    urls: [`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`,
           `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`,
           `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`
          ],
    data: [],
    cats: [],
    dogs: [],
    computers: [],
    query: '',
    // loading: true
  };

  componentDidMount() {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          cats: responseData.photos.photo,
          query: 'cats',
          // loading: false
        });
      })

      // fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      //   .then(response => response.json())
      //   .then(responseData => {
      //     this.setState({
      //       dogs: responseData.photos.photo,
      //       query: '',
      //       loading: false
      //     });
      //   })
      //
      //   fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
      //     .then(response => response.json())
      //     .then(responseData => {
      //       this.setState({
      //         computers: responseData.photos.photo,
      //         query: '',
      //         loading: false
      //       });
      //     })
    // //       })
    // Promise.all(this.state.urls.map(url =>
    //             fetch(url)
    //             .then(response => response.json())
    //             ))
    // .then(data => {data.map(data => this.state.data.push(data.photos.photo))})
    // .then(data => {data.forEach(data => this.state.data.push(data.photos.photo))})

    // this.performSearch();
  }

  performSearch = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          cats: responseData.photos.photo,
          query: query,
          // loading: false
        });
      })
      .catch(error => console.log('Error fetching and parsing data,', error));
  }

  resetLoading = () => {
    return this.setState({
      loading: true
    })
  }

  render() {

      console.log(this.state.cats)
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} resetLoading={this.resetLoading} />
          <Navigation/>
          <Route path="/Cats" render={ () => <PhotoContainer data={this.state.cats} heading={this.state.query} loading={this.state.loading} /> } />
          <Route path="/Dogs" render={ () => <PhotoContainer data={this.state.dogs} heading={this.state.query} loading={this.state.loading} /> } />
          <Route path="/Computers" render={ () => <PhotoContainer data={this.state.computers} heading={this.state.query} loading={this.state.loading} /> } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// <PhotoContainer
//   data={this.state.cats}
//   heading={this.state.query}
//   loading={this.state.loading} />
