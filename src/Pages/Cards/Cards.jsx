import React, { useState, useEffect } from "react";
import { Spin } from "antd"
import { useParams } from "react-router-dom";
import PokeCard from "../../Components/Card/PokeCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import FilterBar from "../../Components/FilterBar/Filterbar";
import "./cards.css";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const [rarity, setRarity] = useState("");
  const [type, setType] = useState("");
  const [holo, setHolo] = useState("");
  const [period, setPeriod] = useState("");
  const [comparison, setComparison] = useState("");
  const [price, setPrice] = useState("");

  const { setId } = useParams();

  useEffect(() => {
      const fetchCards = async () => {
          setIsLoading(true);
          try {
              let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
              let data = await response.json();
              const sortedData = data.data.sort((a, b) => a.id.localeCompare(b.id));
              setCards(sortedData);
          } catch (error) {
              console.error(error);
          }
          setIsLoading(false)
      };

      fetchCards();
  }, [setId]);

  const handleSearch = (term) => {
      setSearchTerm(term); // Update state when the user enters a search term
  }

  const filteredCards = cards
      .filter(card =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(card =>
          rarity ? card.rarity.toLowerCase() === rarity : true
      )
      .filter(card =>
          type ? card.types[0].toLowerCase() === type : true
      )
      .filter(card =>
          holo ? card.holo.toLowerCase() === holo : true
      )
      .filter(card =>
          period ? card.period.toLowerCase() === period : true
      )
      .filter(card =>
          comparison && price ? eval(`${card.cardmarket.prices.trendPrice} ${comparison} ${parseInt(price)}`) : true
      );

  return (
      <div>
          {isLoading ? (
              <div className="spinner_loader_container">
                  <Spin /> 
              </div>
          ) : (
              <div>
                  <SearchBar onChange={handleSearch} />
                      <FilterBar
                          rarity={rarity}
                          setRarity={setRarity}
                          type={type}
                          setType={setType}
                          holo={holo}
                          setHolo={setHolo}
                          period={period}
                          setPeriod={setPeriod}
                          comparison={comparison}
                          setComparison={setComparison}
                          price={price}
                          setPrice={setPrice}
                      />
                      <div className="pokemon_cards_container">
                      {filteredCards.map((card, index) => <PokeCard key={index} card={card} />)}
                  </div>
              </div>
          )}
      </div>
  );
};

export default Cards;