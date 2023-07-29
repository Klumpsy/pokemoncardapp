import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import CardSet from './CardSet'; // Assuming you have a CardSet component

const CardSets = () => {
    const [cardSets, setCardSets] = useState([]);

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

        return (
            <div>
                <h1>CardSets</h1>
                { cardSets.map(cardSet => (
                    <div key={cardSet.id}>
                        <h2>{cardSet.name}</h2>
                        <img src={cardSet.images.logo} alt={cardSet.name}/>
                    </div>
                ))}
            </div>
        );
};

export default CardSets;