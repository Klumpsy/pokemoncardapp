import React, { useState, useContext, useEffect, memo } from "react";
import { Card, Button, List, Select } from "antd";
import { PlusOutlined, MinusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import OwnerContext from "../../Context/OwnerContext";
import OwnerBadge from "./OwnerBadge/OwnerBadge";
import PokeCardModal from "./PokeCardModal/PokeCardModal";
import "./pokecard.css";
import PsaGradeModal from "./PsaGradeModal/PsaGradeModal";
import {setCardCount } from '../../Helpers/FirebaseHelper';

const { Option } = Select;
const valuesToCheck = ['holo v', 'secret', 'ultra', 'rainbow', 'secret'];

const PokeCard = memo(({ card, setId, cardData }) => {
  const [cardRarity, setCardRarity] = useState(valuesToCheck.some(value => card.rarity.toLowerCase().includes(value)) ? 'holo' : 'normal');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPSAModalVisible, setIsPSAModalVisible] = useState(false);
  const cardmarket = card?.cardmarket || {};
  const prices = cardmarket.prices || {};
  const { averageSellPrice, lowPrice, trendPrice } = prices;
  const { owner } = useContext(OwnerContext);

  const initialRarities = cardData?.rarities || {};
  const [normalCount, setNormalCount] = useState(initialRarities.normal || 0);
  const [reverseCount, setReverseCount] = useState(initialRarities.reverse || 0);
  const [holoCount, setHoloCount] = useState(initialRarities.holo || 0);
  const [promoCount, setPromoCount] = useState(initialRarities.promo || 0);

  useEffect(() => {
    const updatedRarities = cardData?.rarities || {};
    setNormalCount(updatedRarities.normal || 0);
    setReverseCount(updatedRarities.reverse || 0);
    setHoloCount(updatedRarities.holo || 0);
    setPromoCount(updatedRarities.promo || 0);
  }, [cardData]);

  const handleAdd = async () => {
    const newCount = await setCardCount(setId, card.id, card.name, owner, 1, cardRarity);
  
    if (cardRarity === 'normal') {
      setNormalCount(newCount);
    } else if (cardRarity === 'holo') {
      setHoloCount(newCount);
    } else if (cardRarity === 'reverse') {
      setReverseCount(newCount);
    } else if (cardRarity === 'promo') {
      setPromoCount(newCount);
    }
  };
  
  const handleRemove = async () => {
    const currentCount = cardData?.rarities?.[cardRarity] || 0;
    if (currentCount > 0 || normalCount > 0 || holoCount > 0 || reverseCount > 0 || promoCount > 0) {
      const newCount = await setCardCount(setId, card.id, card.name, owner, -1, cardRarity);
      if (cardRarity === 'normal') {
        setNormalCount(newCount);
      } else if (cardRarity === 'holo') {
        setHoloCount(newCount);
      } else if (cardRarity === 'reverse') {
        setReverseCount(newCount);
      } else if (cardRarity === 'promo') {
        setPromoCount(newCount);
      }
    } else {
      alert('You do not have that card, so you cannot decrement it');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showPSAModal = () => {
    setIsPSAModalVisible(true);
  };

  const handlePSAModalCancel = () => {
    setIsPSAModalVisible(false);
  };

  return (
    <Card className="pokecard">
      <div className="title_container">
        <h2>
          {`${card.supertype} | ${card.name} | ${card.number}`} <InfoCircleOutlined onClick={showModal}/>
        </h2>
        <h4>{card.rarity}</h4>
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
        </List>
        <div className="owners_badge_container">
          <div className='owners_badge'>
            {
              cardData && cardData.rarities && Object.keys(cardData.rarities).length > 0 
              && <OwnerBadge owner={owner} />
            }
          </div>

              <div className="firebase_data_container">
              <div>
                Normal: {normalCount}
              </div>
              <div>
                Holo: {holoCount}
              </div>
              <div>
                Reverse: {reverseCount}
              </div>
              <div>
                Promo: {promoCount}
              </div>
            </div>
          
          <div className='card_add_and_remove_buttons_container'>
            <Button
                type="default danger"
                shape="circle"
                icon={<MinusOutlined />}
                onClick={handleRemove}
            />

            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={handleAdd}
            />
          </div>
        
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}>
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
          { cardData && (
            <div className="psa_container">
              <div className="psa_logo_container"></div>
              <Button
                className="green-button"
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={showPSAModal}
              />
            </div>)
          }
        </div>
      </div>
      {setId && (
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
});

export default PokeCard;