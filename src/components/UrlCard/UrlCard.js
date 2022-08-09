import React from "react";
import './UrlCard.css'

const UrlCard = ({url}) => {
  return (
    <div key={url.id} className="url-card">
      <h3>{url.title}</h3>
      <a href={url.short_url} target="blank">{url.short_url}</a>
      <p>{url.long_url}</p>
    </div>
  )
}

export default UrlCard;