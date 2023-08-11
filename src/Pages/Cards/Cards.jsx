import React, { useState, useEffect, useContext, useMemo } from "react";
import { Spin } from "antd"
import { useParams } from "react-router-dom";
import PokeCard from "../../Components/Card/PokeCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import FilterBar from "../../Components/FilterBar/Filterbar";
import { filterCards } from "../../Helpers/FilterHelper";
import { getCardData} from '../../Helpers/FirebaseHelper';
import OwnerContext from '../../Context/OwnerContext.js';
import lodash from "lodash";
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
    const [cardData, setCardData] = useState({});
    const { owner } = useContext(OwnerContext);
    const { setId } = useParams(); 

    const [cardTypesCount, setCardTypesCount] = useState({});

    useEffect(() => {
        if (owner && !cardData[owner]) { 
          const fetchCardData = async () => {
            const data = await getCardData(setId, owner);
            setCardData(prevState => ({ ...prevState, [owner]: data }));
          };
          fetchCardData();
        }
    }, [setId, owner, cardData]);

    useEffect(() => {
        const fetchCards = async () => {
          setIsLoading(true);
          try {
            let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
            let data = await response.json();
            const updatedData = data.data.map(card => {
              return { ...card, data: cardData[owner][card.id]};
            });
            const sortedData = updatedData.sort((a, b) => Number(a.number) - Number(b.number));
            setCards(sortedData);
          } catch (error) {
            console.error(error);
          }
          setIsLoading(false);
        };
        if (!cards.length && cardData[owner]) {
          fetchCards();
        }
    }, [setId, cards, cardData, owner]);

    useEffect(() => {
      const countCardTypes = () => {
          let holoCount = 0, reverseCount = 0, normalCount = 0;
  
          if (cardData && cardData[owner]) {
              Object.values(cardData[owner]).forEach(card => {
                  if(card && card.rarities) {
                      const rarities = card.rarities;
                      holoCount += rarities.holo || 0;
                      reverseCount += rarities.reverse || 0;
                      normalCount += rarities.normal || 0;
                  }
              });
          }
  
          setCardTypesCount({ holoCount, reverseCount, normalCount });
      };
  
      countCardTypes();
  }, [cardData, owner])

    const handleSearch = lodash.debounce((term) => {
      setSearchTerm(term.toLowerCase());
    }, 50);

    const filteredCards = useMemo(() => 
    filterCards(cards, rarity, type, holo, period, price, comparison, searchTerm, order),
    [cards, rarity, type, holo, period, price, comparison, searchTerm, order]);

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
                <div class="total_count_container">
                  <p><strong>Normal: </strong>{cardTypesCount.normalCount}</p>
                  <p><strong>Reverse: </strong>{cardTypesCount.reverseCount}</p>
                  <p><strong>Holo: </strong>{cardTypesCount.holoCount}</p>
                </div>
                {filteredCards.map(card => (
                    < PokeCard 
                    key={card.id} 
                    card={card} 
                    cardData={card.data} 
                    setId={setId} 
                 />
                ))}
              </div>
          } 
        </div>
    );
};

export default Cards;