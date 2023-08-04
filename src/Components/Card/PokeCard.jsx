import React, { useState, useContext, useEffect } from 'react';
import { Card, Button, List } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import  {setCardCount}  from '../../Helpers/FirebaseHelper';
import OwnerContext from '../../Context/OwnerContext';
import { getCardData } from '../../Helpers/FirebaseHelper';
import OwnerBadge from './OwnerBadge/OwnerBadge'
import './pokecard.css';

const PokeCard = ({card, setId}) => {
  const [count, setCount] = useState(0);

  console.log(card);

  const cardmarket = card?.cardmarket || {};
  const prices = cardmarket.prices || {};
  const { averageSellPrice, lowPrice, trendPrice } = prices;

  const { owner } = useContext(OwnerContext); 

  useEffect(() => {
    const getInitialCount = async () => {
      const cardData = await getCardData(setId, owner);


      if(cardData && cardData[card.id]) {
        setCount(cardData[card.id].cardAmount || 0);
      } else {
        setCount(0);
      }
    };
    getInitialCount();
  }, [setId, card.id, owner])

  const handleAddCard = async () => {
    await setCardCount(setId, card.id, card.name, owner, 1, setCount, count);
  };

  const handleRemoveCard = async () => {
    if (count > 0) {
      await setCardCount(setId, card.id, card.name, owner, -1, setCount, count);
    }
  };

  const borderColor = owner === 'ronald' && count > 0 
  ? '#33FF9F' 
  : owner === 'bartmartin' && count > 0
    ? '#FFCE33' 
    : count > 0
      ? '#33CAFF'
      : 'white'; // replace 'defaultBorderColor' with what you want

  return (
    <Card style={{ width: "500px", margin:"10px", borderColor: borderColor, borderStyle: "solid", borderWidth: "2px" }} className={`color_border_${owner}`}>
        <div className="owners_badge_container">
          {count > 0 && <OwnerBadge owner={owner} />}
        </div>
      <div style={{ display: "flex" }}>
        <div>
          <img
            alt="example"
            src={card.images.small}
            style={{ width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
            <Button 
            type="default danger" 
            shape="circle" 
            icon={<MinusOutlined />} 
            onClick={handleRemoveCard} />
            <h2 style={{ margin: 0 }}>{count}</h2>
            <Button type="primary" 
            shape="circle" 
            icon={<PlusOutlined />} 
            onClick={handleAddCard}/>
          </div>
        </div>
        <List style={{ width: "100%", marginLeft: "10px" }}>
    <List.Item>
      <List.Item.Meta
        title={`${card.supertype} | ${card.name} | ${card.number}`}
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        title={card.rarity}
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        title={`avg sell: €${averageSellPrice} | low: €${lowPrice} | trent: €${trendPrice}`}
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        title="Item 4"
      />
    </List.Item>
</List>

      </div>
    </Card>
  );
};

export default PokeCard;
