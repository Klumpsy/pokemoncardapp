import React, { useState, useEffect, useContext } from "react";
import { Spin } from "antd"
import { useParams } from "react-router-dom";
import PokeCard from "../../Components/Card/PokeCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import FilterBar from "../../Components/FilterBar/Filterbar";
import {filterCards} from "../../Helpers/FilterHelper";
import {getCardData } from '../../Helpers/FirebaseHelper';
import OwnerContext from '../../Context/OwnerContext.js';
import "./cards.css";

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("asc");
    const [rarity, setRarity] = useState("");
    const [type, setType] = useState("");
    const [holo, setHolo] = useState("");
    const [period, setPeriod] = useState("");
    const [comparison, setComparison] = useState("");
    const [price, setPrice] = useState("");
    const [cardData, setCardData] = useState({}); // Added this state
    const { setId } = useParams();

    const { owner } = useContext(OwnerContext);

    useEffect(() => {
      if (owner) { 
        const fetchCardData = async () => {
          const data = await getCardData(setId, owner);
          return data;
        };
        fetchCardData().then(data => setCardData(data));
      }
  }, [setId, owner]);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
        let data = await response.json();
        const updatedData = data.data.map(card => {
          return { ...card, data: cardData[card.id]};
        });
        const sortedData = updatedData.sort((a, b) => Number(a.number) - Number(b.number));
        setCards(sortedData);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchCards();
  }, [cardData, setId]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Update state when user enters a search term
  }

  console.log(cards);

  const filteredCards = filterCards(
    cards, 
    rarity, 
    type, 
    holo, 
    period, 
    price, 
    comparison, 
    searchTerm,
    order
    );

    return (
        <div>
          <div className='search_filter_sticky_container'>
            <div className="searchbar_container">
              <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <div className="filter_container">
              <FilterBar 
                order={order} 
                setOrder={setOrder} 
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
            </div>
          </div>
          {isLoading ?  
            <div className="spinner_loader_container">
              <Spin size="large" />
            </div>
           : 
            <div className="pokemon_cards_container">
              {filteredCards.map((card) => 
                <PokeCard key={card.id} card={card} setId={setId} />
              )}
            </div>
          } 
        </div>
      );
};

export default Cards;