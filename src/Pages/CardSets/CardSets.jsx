import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardSet from '../../Components/CardSet/Cardset.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './cardsets.css';

const CardSets = () => {
    const [cardSets, setCardSets] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://api.pokemontcg.io/v2/sets', {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_TCG_API_KEY}`
                }
            });
            setCardSets(result.data.data);
        }

        fetchData();
    }, []);

    const filteredCardSets = cardSets.filter(set => 
        set.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        set.id.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div>
            <h1>CardSets</h1>
            <SearchBar value={searchValue} onChange={setSearchValue} />
            <div className="card_set_container">
                {filteredCardSets.map(cardSet => (
                    <CardSet data={cardSet}/>
                ))}
            </div>
        </div>
    );
};

export default CardSets;