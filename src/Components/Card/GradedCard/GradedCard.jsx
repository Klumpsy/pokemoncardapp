import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin} from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import OwnerBadge from "../OwnerBadge/OwnerBadge";
import "./gradedcard.css";

const GradedCard = ({ gradedCardData, handleOpenModal, handleDelete }) => {
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCardData = async () => {
      setIsLoading(true);
      const res = await axios.get(`https://api.pokemontcg.io/v2/cards/${gradedCardData.id}`, {
        headers: { 
            Authorization: `Bearer ${process.env.REACT_APP_TCG_API_KEY}` 
        }
      });
      setCard(res.data.data);
      setIsLoading(false);
    };

    fetchCardData();
  }, [gradedCardData]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="graded_card_container">
      <div className='title_container'>
        <div className='title_badge'>
            <h3>{card?.name}</h3>
            <OwnerBadge owner={gradedCardData.owner} />
        </div>
        <img src={card?.images?.small} alt={card?.name} />
      </div>
      <div className="graded_cards_info">
        <div>
            <p><strong>Card id: </strong>{gradedCardData.id}</p>
            <p><strong>Set id: </strong>{gradedCardData.setId}</p>
            <p><strong>Grade: </strong>{gradedCardData.cardData.grade}</p>
            <p><strong>Send at: </strong>
            {typeof gradedCardData.cardData.sendAt === 'string'
            ? new Date(gradedCardData.cardData.sendAt).toLocaleDateString() 
            : gradedCardData.cardData.sendAt.toDate().toLocaleDateString()}</p>
            <p><strong>Received at: </strong>
            {typeof gradedCardData.cardData.receivedAt === 'string'
            ? gradedCardData.cardData.receivedAt
            : gradedCardData.cardData.receivedAt.toDate().toLocaleDateString()}</p>
        </div>
        <div>
            <p>{gradedCardData.cardData.comments}</p>
        </div>
      </div>
      <div>
        <EditOutlined 
          onClick={() => handleOpenModal(card, gradedCardData)}
          className='edit_button'
        />
          
        <DeleteOutlined 
          className='delete_button'
          onClick={() => handleDelete(gradedCardData.id)}
        /> 
      </div>
    </div>
  );
};

export default GradedCard;