import React, { useState, useEffect } from 'react';
import PsaGradeModal from '../../Components/Card/PsaGradeModal/PsaGradeModal';
import GradedCard from '../../Components/Card/GradedCard/GradedCard'; // import GradedCard component here
import { getAllGradedCards } from '../../Helpers/FirebaseHelper';

const PsaGraded = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [gradedModalVisible, setGradedModalVisible] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [gradedCardsData, setGradedCardsData] = useState([]);
    const [gradedCard, setGradedCard] = useState(null);
  
    useEffect(() => {
        const fetchGradedCards = async () => {
            setIsLoading(true);
            const data = await getAllGradedCards();
            setGradedCardsData(data);
            setIsLoading(false);
        };
      
        fetchGradedCards();
    }, []);

    const handleOpenModal = (card, gradedCard) => {
        setCurrentCard(card);
        setGradedCard(gradedCard);
        setGradedModalVisible(true);
    }

    const handleCloseModal = () => {
        setCurrentCard(null);
        setGradedModalVisible(false);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
  return (
    <div>
        <h1>Psa graded cards</h1>
        <div>
            <h2>Send for grading</h2>
            {gradedCardsData.map((card, index) => (
                <GradedCard 
                    key={index} 
                    gradedCardData={card} 
                    handleOpenModal={handleOpenModal} 
                /> 
            ))}
        </div>
        <div>
            <h2>Graded</h2>
        </div>
        {
        gradedCard && currentCard 
        ? (<PsaGradeModal
        isPsaGradeModalVisible={gradedModalVisible}
        handleCancel={handleCloseModal}
        card={currentCard}
        setId={gradedCard.setId}
        cardData={gradedCard.cardData}
        />)
        : null
        }
    </div>
)};

export default PsaGraded;