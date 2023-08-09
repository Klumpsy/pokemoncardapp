import { useState, useEffect } from "react";
import { getLastAddedCards } from "../../Helpers/FirebaseHelper";
import QueryPokeCard from "../../Components/Card/QueryPokeCard/QueryPokeCard";
import { Carousel } from 'antd';

const Homepage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cards = await getLastAddedCards(12);
      setCards(cards);
    }

    fetchData();
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }

    return (
      <div>
        <h1>Pokéstop B&M </h1>
        <h2>Last Added 12 Cards</h2>
      <div className='carousel_container'>
        <Carousel autoplay {...settings} autoplaySpeed={8000}>
          {cards.map((card, index) => (
            <QueryPokeCard key={index + card.id} card={card}/>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Homepage;
