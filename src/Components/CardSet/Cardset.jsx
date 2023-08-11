import React from 'react';
import { Link } from "react-router-dom";
import { EditOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import "./cardset.css";

const CardSet =  ({ data, handleFavorite, isFavorited }) => {
    return (
      <div 
      key={data.id} 
      className={`card_set_card ${isFavorited ? "favorite_set_border" : ""}`}
      >
        <div className="left_side_info">
        <div onClick={handleFavorite}>
          {isFavorited ? <StarFilled className="favorite_icon" /> :  <StarOutlined className="favorite_icon" />}
        </div>
          <div className='card_image_container'>
            <img alt={data.name} src={data.images.logo} />
          </div>
          <div className="symbol_and_title_container">
            <h2 className="card_title">{data.name}</h2>
          </div>
        </div>
       <div className="card_set_info">
          <div className='card_set_release_total_container'>
              <p>Release Date: {data.releaseDate}</p>
              <p>Total: {data.total}</p>
          </div>
         <div className='logo_edit_container'>
            <div className='card_logo_container'>
              <img alt={data.name} src={data.images.symbol} />
            </div>
            <Link to={`/cardsets/${data.name}/${data.id}/cards`}>
              <EditOutlined key="edit" className="edit_symbol" />
            </Link>
         </div>
       </div>
      </div>
    );
  }

export default CardSet;