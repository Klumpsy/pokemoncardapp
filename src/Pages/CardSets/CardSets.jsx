import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardSet from '../../Components/CardSet/Cardset.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './cardsets.css';
import { getAllFavoriteSets, makeSetFavorite, removeSetFavorite} from '../../Helpers/FirebaseHelper.js';

const CardSets = () => {
    const [cardSets, setCardSets] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [favoriteSets, setFavoriteSets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://api.pokemontcg.io/v2/sets', {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_TCG_API_KEY}`
                }
            });
            setCardSets(result.data.data);
            const favSets = await getAllFavoriteSets();
            setFavoriteSets(favSets);
        }

        fetchData();
    }, []);

    const handleFavorite = async (setId) => {
      
        if (favoriteSets.includes(setId)) {
            await removeSetFavorite(setId);
            setFavoriteSets(favoriteSets.filter(set => set !== setId));
        } else {
            await makeSetFavorite(setId);
            setFavoriteSets([...favoriteSets, setId]);
        }
    }

    const filteredCardSets = cardSets.filter(set =>
        set.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        set.id.toLowerCase().includes(searchValue.toLowerCase())
    );

    const favoriteCardSets = filteredCardSets.filter(set => favoriteSets.includes(set.id));
    const otherCardSets = filteredCardSets.filter(set => !favoriteSets.includes(set.id));

    return (
        <div>
            <h1>CardSets</h1>
            <SearchBar value={searchValue} onChange={setSearchValue} />
            <div className="favorite_card_set_container">
                <h2>Favorite Sets</h2>
                {favoriteCardSets.map(cardSet => (
                    <CardSet 
                    data={cardSet}
                    handleFavorite={() => handleFavorite(cardSet.id)}
                    isFavorited={favoriteSets.includes(cardSet.id)}
                    />
                ))}
            </div>
            <div className="card_set_container">
                <h2>All Sets</h2>  
                {otherCardSets.map(cardSet => (
                    <CardSet 
                    data={cardSet}
                    handleFavorite={() => handleFavorite(cardSet.id)}
                    isFavorited={favoriteSets.includes(cardSet.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardSets;