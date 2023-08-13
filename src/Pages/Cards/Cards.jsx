import React, { useState, useEffect, useContext} from "react";
import { Spin, Select, Input } from "antd"
import { useParams } from "react-router-dom";
import PokeCard from "../../Components/Card/PokeCard";
import { getCardData} from '../../Helpers/FirebaseHelper';
import OwnerContext from '../../Context/OwnerContext.js';
import "./cards.css";

const { Option } = Select;

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [cardData, setCardData] = useState({});
    const { owner, setOwner } = useContext(OwnerContext);
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
            setFilteredData(sortedData);
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

  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm]);

  const handleSearch = (event) => {
    if(!cards || !cardData){
        
    }
    const searchTerm = event.toLowerCase();
    const filtered = cards.filter((card) => {
      return card.name.toLowerCase().includes(searchTerm) 
      || card.number.toLowerCase().includes(searchTerm);
    });

    setFilteredData(filtered);
}

    return (
        <div>
            <div className='search_filter_sticky_container'>
                <div className="searchbar_container">
                   <Input 
                    type='search'
                    placeholder="search card by id or name"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                   />
                </div>
                <div className="filter_container">
                <Select
                  placeholder="Select an Owner"
                  onChange={value => setOwner(value)}
                  defaultValue={'bartmartin'}
                  >
                  <Option value="martin">Martin</Option>
                  <Option value="bartmartin">Bart & Martin</Option>
                  <Option value="ronald">Ronald</Option>
                </Select>
              </div>
          </div>
          {isLoading ?  
              <div className="spinner_loader_container">
                <Spin size="large" />
              </div>
             : 
              <div className="pokemon_cards_container">
                <div class="total_count_container">
                  <p><strong>Total: </strong>{cardTypesCount.holoCount + cardTypesCount.normalCount + cardTypesCount.reverseCount}</p>
                  <p><strong>Normal: </strong>{cardTypesCount.normalCount}</p>
                  <p><strong>Reverse: </strong>{cardTypesCount.reverseCount}</p>
                  <p><strong>Holo: </strong>{cardTypesCount.holoCount}</p>
                </div>
                {filteredData.map(card => (
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