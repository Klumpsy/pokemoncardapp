import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import "./cardset.css";

const CardSet = ({ data }) => {
    return (
      <Card
        key={data.id}
        className='card_set_card'
        cover={
          <div className='card_image_container'>
            <img alt={data.name} src={data.images.logo} />
          </div>
        }
        actions={[
          <SettingOutlined key="setting"/>,
          <Link to={`/cardsets/${data.name}/${data.id}/cards`}><EditOutlined key="edit" /></Link>,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <div className="symbol_and_title_container">
            <h2 className="card_title">{data.name}</h2>
            <div>
                <img alt={data.name} src={data.images.symbol} />
            </div>
        </div>
        <p>Release Date: {data.releaseDate}</p>
        <p>Total: {data.total}</p>
        <p>Last Updated: {data.updatedAt}</p>
      </Card>
    );
  }

export default CardSet;