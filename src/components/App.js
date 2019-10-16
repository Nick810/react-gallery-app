import React, { Component } from 'react';
import posed from 'react-pose';
import { BrowserRouter, Route, Switch,} from 'react-router-dom';

import apiKey from './key/config.js';

import Home from './Home';
import Navigation from './Nav';
import SearchForm from './SearchForm';
import SearchMessage from './Search';
import PhotoContainer from './PhotoContainer';
import NotFound404 from './404'

const HomeContent = posed.div({
  hidden: {opacity: 0, y: 30, transition: {duration: 500}},
  isVisible: { opacity: 1, y: 0, transition: {duration: 1000} }
});

class App extends Component {

  state = {
    urls: [`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`,
           `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`,
           `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`
          ],
    cats: {},
    dogs: {},
    computers: {},
    search: {},
    loaded: false,
    isVisible: false
  };

  performSearch = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          search: responseData.photos.photo,
          query: query,
          loading: false
        });
      })
      .catch(error => console.log('Error fetching and parsing data,', error));
  }

  resetLoading = () => {
    return this.setState({
      loading: true
    })
  }

  async componentDidMount() {
    if (localStorage.getItem('currentSearch') !== null) {
      const query = localStorage.getItem('currentSearch');
      this.performSearch(query)
    }

     this.setState({ isVisible: !this.state.isVisible });

    try {
      await fetch(this.state.urls[0])
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            cats: {
              data: responseData.photos.photo,
              query: 'cats',
              loading: false
            }
          });
        })
    } catch(error) {
      return console.log('Unexpected error occurred. Can\'t fetch cats data')
    }

    try {
      await fetch(this.state.urls[1])
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            dogs: {
              data: responseData.photos.photo,
              query: 'dogs',
              loading: false
            }
          });
        })
    } catch(error) {
      return console.log('Unexpected error occurred. Can\'t fetch dogs data')
    }

    try {
      await fetch(this.state.urls[2])
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            computers: {
              data: responseData.photos.photo,
              query: 'computers',
              loading: false
            }
          });
        })
    } catch(error) {
      return console.log('Unexpected error occurred. Can\'t fetch computers data')
    }

    return this.checkLoading();
  }

  checkLoading() {
    if (Object.keys(this.state.cats).length > 0 &&
        Object.keys(this.state.dogs).length > 0 &&
        Object.keys(this.state.computers).length > 0) {
        this.setState({
          isVisible: false,
        })

      return setTimeout(() => {
        this.setState({
          loaded: true,
          isVisible: true,
        })
      }, 500)
    }
  }

  mainContent() {
    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/Search' component={ SearchMessage } />
        <Route path="/Cats" render={ () => <PhotoContainer data={this.state.cats.data} heading={this.state.cats.query} loading={this.state.cats.loading} /> } />
        <Route path="/Dogs" render={ () => <PhotoContainer data={this.state.dogs.data} heading={this.state.dogs.query} loading={this.state.dogs.loading} /> } />
        <Route path="/Computers" render={ () => <PhotoContainer data={this.state.computers.data} heading={this.state.computers.query} loading={this.state.computers.loading} /> } />
        <Route path="/Search/:searchQuery" render={ () => <PhotoContainer data={this.state.search} heading={this.state.query} loading={this.state.loading} /> } />
        <Route component={ NotFound404 }/>
      </Switch>
    );
  }

  render() {
    const { isVisible } = this.state;

    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} resetLoading={this.resetLoading} />
          <Navigation />

          <HomeContent pose={isVisible ? 'isVisible' : 'hidden'}>
            { this.state.loaded ? this.mainContent() : <h2 onClick={this.refreshPage}>Loading...</h2> }
          </HomeContent>

        </div>
      </BrowserRouter>
    );
  }

}

export default App;
