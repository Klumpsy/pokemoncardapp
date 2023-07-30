import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokeCard from "../../Components/Card/PokeCard";
import "./cards.css";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const { setId } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
        let data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, [setId]);

  return (
    <div className="pokemon_cards_container">
      {cards.map((card, index) => (
        <PokeCard card={card} key={index}/>
      ))}
    </div>
  );
};

export default Cards;