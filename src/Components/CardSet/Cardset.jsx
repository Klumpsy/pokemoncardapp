import React from 'react';
import { Link } from "react-router-dom";
import { EditOutlined } from '@ant-design/icons';
import "./cardset.css";

const CardSet = ({ data }) => {
    return (
      <div key={data.id} className='card_set_card'>
          <div class='card_header'>
            <div className='card_image_container'>
              <img alt={data.name} src={data.images.logo} />
            </div>
            <div className='card_logo_container'>
              <img alt={data.name} src={data.images.symbol} />
            </div>
          </div>
        <div className="symbol_and_title_container">
            <h2 className="card_title">{data.name}</h2>
            
        </div>
       <div className="card_set_info">
          <p>Release Date: {data.releaseDate}</p>
          <p>Total: {data.total}</p>
          <div className="button_edit">
            <p>Last Updated: {data.updatedAt}</p>
          <Link to={`/cardsets/${data.name}/${data.id}/cards`}>
              <EditOutlined key="edit" className="edit_symbol" />
          </Link>
          </div>
       </div>
      </div>
    );
  }

export default CardSet;