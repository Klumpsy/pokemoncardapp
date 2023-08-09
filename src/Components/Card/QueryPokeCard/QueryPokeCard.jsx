import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './querypokecard.css';

const QueryPokeCard = ({card}) => {
    const [cardDetails, setCardDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchCardData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`https://api.pokemontcg.io/v2/cards/${card.id}`, {
            headers: { 
                Authorization: `Bearer ${process.env.REACT_APP_TCG_API_KEY}` 
            },
          });
          setCardDetails(res.data.data);
        } catch(error) {
          console.log('error occurred while fetching data', error);
        }
        setIsLoading(false);
      };
  
      fetchCardData();
    }, [card.id]);

    const dateObject = new Date(card.lastAddedOn);
    const date = dateObject.toLocaleString();

  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  } else if(cardDetails) {
    return (
      <div className={`card_container`}>
        <h3>{`${cardDetails.id} | ${cardDetails.name} | ${cardDetails.number}`}</h3>
        <img
            className="card_image"
            alt="pokemon-card"
            src={cardDetails.images.small}
            style={{ width: "100%" }}
          />
        <div class='date_logo_container'>
        <img
            className='logo_image'
            alt="pokemon-card"
            src={cardDetails.set.images.logo}
            style={{ width: "100%" }}
          />
          <p><strong>Added: </strong>{date}</p>
        </div>
      </div>
    )  
  }else {
    return <div></div>
  }
  
}

export default QueryPokeCard;