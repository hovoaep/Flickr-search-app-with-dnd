import React from 'react';
import ReactDOM from 'react-dom';
import Container from "./components/Container"
const title = "Flickr search app with drag and drop for Aparg "
ReactDOM.render(

  <div>
  <header>
    {title}
  </header>
  <div>
  <Container />
  </div>
  </div>,
  document.getElementById('app')
);

module.hot.accept();
