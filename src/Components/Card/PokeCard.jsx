import React, { useState, useContext, useEffect } from 'react';
import { Card, Button, List, Select } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import  {setCardCount}  from '../../Helpers/FirebaseHelper';
import OwnerContext from '../../Context/OwnerContext';
import { getCardData } from '../../Helpers/FirebaseHelper';
import OwnerBadge from './OwnerBadge/OwnerBadge'
import './pokecard.css';

const { Option } = Select;

const PokeCard = ({card, setId}) => {
  const [count, setCount] = useState(0);
  const [cardRarity, setCardRarity] = useState('normal');

  const cardmarket = card?.cardmarket || {};
  const prices = cardmarket.prices || {};
  const { averageSellPrice, lowPrice, trendPrice } = prices;

  const { owner } = useContext(OwnerContext); 

  const [cardData, setCardData] = useState(null); 

  console.log(cardData);

  useEffect(() => {
    const getInitialCount = async () => {
      const fetchedCardData = await getCardData(setId, owner); // renamed cardData to fetchedCardData
      setCardData(fetchedCardData);
      if(fetchedCardData && fetchedCardData[card.id] && fetchedCardData[card.id][cardRarity]) {
        setCount(fetchedCardData[card.id][cardRarity].cardAmount || 0);
      } else {
        setCount(0);
      }
    };
    getInitialCount();
  }, [setId, card.id, owner, cardRarity]);

  const handleAddCard = async () => {
    await setCardCount(setId, card.id, card.name, owner, 1, cardRarity);
    const updatedData = await getCardData(setId, owner); // Fetch the updated data
    setCardData(updatedData); // Update cardData with the fetched data
  };

  const handleRemoveCard = async () => {
    if (count > 0) {
      await setCardCount(setId, card.id, card.name, owner, -1, cardRarity);
      const updatedData = await getCardData(setId, owner); // Fetch the updated data
      setCardData(updatedData); // Update cardData with the fetched data
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
             <Select
            placeholder="Select a rarity"
            onChange={value => setCardRarity(value)}
            defaultValue={'normal'}
            >
            <Option value="normal">Normal</Option>
            <Option value="reverse">Reverse</Option>
            <Option value="holo">Holo</Option>
            <Option value="promo">Promo</Option>
        </Select>
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
      />
      <div className="owners_badge_container">
          {count > 0 && <OwnerBadge owner={owner} />}
        </div>
    </List.Item>

</List>

<div className="owners_badge_container">
    { cardData && cardData[card.id] &&
      <div>
        <div>Normal: {cardData[card.id].normal?.cardAmount || 0}</div>
        <div>Holo: {cardData[card.id].holo?.cardAmount || 0}</div>
        <div>Reverse: {cardData[card.id].reverse?.cardAmount || 0}</div>
        <div>Promo: {cardData[card.id].promo?.cardAmount || 0}</div>
      </div>
    }
    {count > 0 && <OwnerBadge owner={owner} />}
  </div>

      </div>
    </Card>
  );
};

export default PokeCard;
