import React from 'react';
import UrlCard from '../UrlCard/UrlCard';
import './UrlContainer.css';

const UrlContainer = ({urls}) => {
  const urlEls = urls.map(url => {
    return (
      <UrlCard key={url.id} url={url} />
    )
  });

  return (
    <section className='url-container'>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
