import React, { Component } from 'react';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'AJA5CNOIixLZTumQRlpWD1io0xTtrBb4EHfPzSEXB7o';

class Home extends Component {
  state = {
    searchInput: 'Backgrounds',
    images: [],
    loading: true,
    hoveredImage: null,
  };

  componentDidMount() {
    this.searchImages(this.state.searchInput);
  }


  onChangeSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  searchImages = async (query) => {
    this.setState({ loading: true });
    try {
      const response = await fetch(`${API_URL}?query=${query}&client_id=${API_KEY}`);
      const data = await response.json();
      this.setState({ images: data.results, loading: false });
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  onSearchClick = () => {
    const { searchInput } = this.state;
    if (searchInput.trim()) {
      this.searchImages(searchInput);
    }
  };

  onRecentSearchClick = (query) => {
    this.setState({ searchInput: query }, () => {
      this.searchImages(query);
    });
  };

  onHoverImage = (image) => {
    this.setState({ hoveredImage: image });
  };

  onLeaveImage = () => {
    this.setState({ hoveredImage: null });
  };

  render() {
    const { searchInput, images, loading, hoveredImage } = this.state;

    return (
      <div className='background_container'>
        <h1 className='heading'>IMAGE SEARCH</h1>
        <div>
          <input
            type='search'
            value={searchInput}
            placeholder='search....'
            className='search-bar'
            onChange={this.onChangeSearchInput}
          />
          <button onClick={this.onSearchClick} className='search-button'>Search</button>
        </div>
        <div className='recent_search_container'>
          <div className='search_text' onClick={() => this.onRecentSearchClick('Cars')}>
            Cars
          </div>
          <div className='search_text' onClick={() => this.onRecentSearchClick('Mountains')}>
            Mountains
          </div>
          <div className='search_text' onClick={() => this.onRecentSearchClick('Flowers')}>
            Flowers
          </div>
          <div className='search_text' onClick={() => this.onRecentSearchClick('Cities')}>
            Cities
          </div>
        </div>
        {loading ? (
          <div className='loading'>Loading...</div>
        ) : (
          <div className='image_gallery'>
            {Array.isArray(images) && images.map((image) => (
              <div
                key={image.id}
                className='image_item'
                onMouseEnter={() => this.onHoverImage(image)}
                onMouseLeave={this.onLeaveImage}
              >
                <img src={image.urls.small} alt={image.alt_description} />
                {hoveredImage === image && (
                  <div className='image_details'>
                    <p>{image.description || image.alt_description}</p>
                    <p>By: {image.user.name}</p>
                    <p>Likes: {image.likes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
