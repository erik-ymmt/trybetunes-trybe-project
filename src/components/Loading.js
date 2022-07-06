import React from 'react';
import LoadingGif from '../images/Pulse-loading.gif';
import './Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div data-testid="page-album" className="loading-container">
        <img src={ LoadingGif } alt="carregando" width="25%" />
      </div>
    );
  }
}

export default Loading;
