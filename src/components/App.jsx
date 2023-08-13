import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import api from 'api/api';
import LoadMore from './LoadMore';
import Loader from './Loader';
import Modal from './Modal';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    status: STATUS.IDLE,
    modal: false,
    modalImg: '',
    total: 0,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query && this.state.query) {
      try {
        await this.setState({ page: 1, images: [], total: 0 });

        const { data } = await api(this.state.query, this.state.page);
        this.setState({
          page: 1,
          images: data.hits,
          status: STATUS.RESOLVED,
          total: data.total,
        });
      } catch {
        this.setState({ status: STATUS.REJECTED });
      }
    }

    if (prevState.page < this.state.page) {
      const { data } = await api(this.state.query, this.state.page);

      if (prevState.query !== this.state.query) {
        this.setState({ images: data.hits });
        return;
      }

      this.setState({
        images: [...prevState.images, ...data.hits],
        status: STATUS.RESOLVED,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalEsc);
  }

  onSubmit = async evt => {
    evt.preventDefault();

    this.setState({ status: STATUS.PENDING });

    if (!evt.target.elements.search.value) {
      this.setState({ status: STATUS.REJECTED });
    }

    await this.setState({ query: evt.target.elements.search.value });

    evt.target.elements.search.value = '';
  };

  loadMore = () => {
    this.setState({ status: STATUS.PENDING });

    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  openModal = e => {
    this.setState({ modalImg: e.target.title });
    this.setState({ modal: true });
    window.addEventListener('keydown', this.closeModalEsc);
  };

  closeModalEsc = e => {
    if (e.code === 'Escape') {
      this.setState({ modal: false });
    }
  };

  closeModal = e => {
    if (e.currentTarget === e.target) {
      this.setState({ modal: false });
    }
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.status === STATUS.REJECTED && (
          <p>Fill in the search field...</p>
        )}

        <ImageGallery>
          {this.state.images.map(({ id, webformatURL, largeImageURL, tag }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                openModal={this.openModal}
                tag={tag}
              />
            );
          })}
        </ImageGallery>

        {this.state.modal && (
          <Modal url={this.state.modalImg} closeModal={this.closeModal} />
        )}
        {this.state.status === STATUS.PENDING && <Loader />}

        {this.state.images.length > 0 &&
          this.state.images.length < this.state.total && (
            <LoadMore loadMore={this.loadMore} />
          )}
      </>
    );
  }
}
