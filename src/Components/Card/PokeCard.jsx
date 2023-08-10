import React, { useState, useContext, useEffect } from "react";
import { Card, Button, List, Select } from "antd";
import { PlusOutlined, MinusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { setCardCount, getCardData } from '../../Helpers/FirebaseHelper';
import OwnerContext from "../../Context/OwnerContext";
import OwnerBadge from "./OwnerBadge/OwnerBadge";
import PokeCardModal from "./PokeCardModal/PokeCardModal";
import "./pokecard.css";
import PsaGradeModal from "./PsaGradeModal/PsaGradeModal";

const { Option } = Select;
const valuesToCheck = ['holo v', 'secret', 'ultra', 'rainbow', 'secret', 'rare holo'];

const PokeCard = ({ card, setId }) => {
  const [count, setCount] = useState(0);
  const [cardRarity, setCardRarity] = useState(valuesToCheck.some(value => card.rarity.toLowerCase().includes(value)) ? 'holo' : 'normal');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPSAModalVisible, setPSAModalVisible] = useState(false);
  const cardmarket = card?.cardmarket || {};
  const prices = cardmarket.prices || {};
  const { averageSellPrice, lowPrice, trendPrice } = prices;
  const [cardData, setCardData] = useState(null);
  const { owner } = useContext(OwnerContext);

  useEffect(() => {
    const getInitialCount = async () => {
      const fetchedCardData = await getCardData(setId, owner);
      setCardData(fetchedCardData);
      if (
        fetchedCardData &&
        fetchedCardData[card.id] &&
        fetchedCardData[card.id][cardRarity]
      ) {
        setCount(fetchedCardData[card.id][cardRarity].cardAmount || 0);
      } else {
        setCount(0);
      }
    };
    getInitialCount();
  }, [setId, card.id, owner, cardRarity]);

  const handleAddCard = async () => {
    await setCardCount(setId, card.id, card.name, owner, 1, cardRarity);
    const updatedData = await getCardData(setId, owner);
    setCardData(updatedData);
  };

  const handleRemoveCard = async () => {
    const currentCount = cardData?.[card.id]?.rarities?.[cardRarity] || 0; 
    if (currentCount > 0) {
      await setCardCount(setId, card.id, card.name, owner, -1, cardRarity);
      const updatedData = await getCardData(setId, owner);
      setCardData(updatedData);
    } else {
      alert('You do not have that card, so you cannot decrement it');
    }
  };

  const showModel = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showPSAModal = () => {
    setPSAModalVisible(true);
  };

  const handlePSAModalCancel = () => {
    setPSAModalVisible(false);
  };

  return (
    <Card className="pokecard">
      <div className="title_container">
        <h2>
          {`${card.supertype} | ${card.name} | ${card.number}`} <InfoCircleOutlined onClick={showModel}/>
        </h2>
        <h4>
            {card.rarity}
        </h4>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <img
            alt="pokemon-card"
            src={card.images.small}
            style={{ width: "100%" }}
          />
        </div>
        <List className='pokecard_list'>
          <List.Item>
            <List.Item.Meta
              title={`avg: €${averageSellPrice}`}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={`low: €${lowPrice}`}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={`trend: €${trendPrice}`}
            />
          </List.Item>
          <List.Item>
            <div className="owners_badge_container">
              {count > 0 && <OwnerBadge owner={owner} />}
            </div>
          </List.Item>
        </List>
        <div className="owners_badge_container">
          <div className='owners_badge'>
          {
            cardData
            && cardData[card.id]
            && cardData[card.id].rarities
            && Object.keys(cardData[card.id].rarities).length > 0 
            && <OwnerBadge owner={owner} />
          }
        </div>
          {cardData && cardData[card.id] && (
        <div className="firebase_data_container">
        <div>
            Normal: {cardData[card.id].rarities.normal || 0}
        </div>
        <div>
            Holo: {cardData[card.id].rarities.holo || 0}
        </div>
        <div>
            Reverse: {cardData[card.id].rarities.reverse || 0}
        </div>
        <div>
            Promo: {cardData[card.id].rarities.promo || 0}
        </div>
            
        </div>
    )}
      <div>
        <div className='card_add_and_remove_buttons_container'>
        <Button
              type="default danger"
              shape="circle"
              icon={<MinusOutlined />}
              onClick={handleRemoveCard}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={handleAddCard}
            />
        </div>
     
            <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {
               valuesToCheck.some(value => card.rarity.toLowerCase().includes(value)) ? (
            <Select
              placeholder="Select a rarity"
              onChange={(value) => setCardRarity(value)}
              defaultValue={"holo"}
            >
              <Option value="holo">Holo</Option>
              <Option value="promo">Promo</Option>
            </Select>
             ) : (
              <Select
              placeholder="Select a rarity"
              onChange={(value) => setCardRarity(value)}
              defaultValue={"normal"}
            >
              <Option value="normal">Normal</Option>
              <Option value="reverse">Reverse</Option>
              <Option value="holo">Holo</Option>
              <Option value="promo">Promo</Option>    
            </Select>
              )
            }  
          </div>
          { cardData && cardData[card.id] &&  (
            <div className="psa_container">
            <div className="psa_logo_container">

            </div>
            <Button
              className="green-button"
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={showPSAModal}
            />
        </div>
          )}
      </div>
      </div>
      </div>
      {card && setId && (
      <>
        <PokeCardModal 
          isVisible={isModalVisible} 
          handleCancel={handleCancel} 
          card={card} 
          cardData={cardData}
        />
        <PsaGradeModal
          isPsaGradeModalVisible={isPSAModalVisible}
          handleCancel={handlePSAModalCancel} 
          card={card} 
          setId={setId}
          cardData={cardData}
        />
      </>
      )}
    </Card>
  );
};

export default PokeCard;