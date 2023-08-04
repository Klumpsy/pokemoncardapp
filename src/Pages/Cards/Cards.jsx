import React, { useState, useEffect } from "react";
import { Spin } from "antd"
import { useParams } from "react-router-dom";
import PokeCard from "../../Components/Card/PokeCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import FilterBar from "../../Components/FilterBar/Filterbar";
import {filterCards} from "../../Helpers/FilterHelper";
import {getCardData } from '../../Helpers/FirebaseHelper';
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

  const { setId } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
        setIsLoading(true);
        try {
            let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
            let data = await response.json();
            setCards(data.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    fetchCards();
}, [setId]);

useEffect(() => {
    const orderedCards = [...cards].sort((a, b) => {
        const numA = parseInt(a.number);
        const numB = parseInt(b.number);

        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;

        if (order === "asc") {
            return numA - numB;
        } else {
            return numB - numA;
        }
    });

    setCards(orderedCards);
}, [order]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Update state when user enters a search term
  }

  const filteredCards = filterCards(
    cards, 
    rarity, 
    type, 
    holo, 
    period, 
    price, 
    comparison, 
    searchTerm
    );

 return (
      <div>
          {isLoading ? (
              <div className="spinner_loader_container">
                  <Spin /> 
              </div>
          ) : (
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
                <div className="pokemon_cards_container">
                    {filteredCards.map((card, index) => <PokeCard key={index} card={card} setId={setId} />)}
                </div>
              </div>
          )}
      </div>
  );
};

export default Cards;