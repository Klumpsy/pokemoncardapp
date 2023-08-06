import { Modal, Button } from "antd";
import './pokecardmodal.css';
import AvarageSellPricesBarChart from "../../Charts/AvarageSellPricesBarChart";

const PokeCardModal = ({ isVisible, handleCancel, card, cardData }) => {
    
    const handleClick = () => {
        window.open(card.cardmarket.url, '_blank');
    }

    console.log(card, cardData);

    return (

<Modal 
    title="Card Details" 
    visible={isVisible} 
    onCancel={handleCancel} 
    footer={null} 
    maskClosable={false}
    width={'80%'}
    height={'800px'}
    >
     <div className='title_container'>
        <h2>{card.name} | {card.number}</h2>
        <img src={card.set.images.symbol} alt={card.name} />
     </div>
    <div className='column_container'>
    <div className='left_column'>
        <img src={card.images.small} alt={card.name} />
        <div className="sell_chart_container">
            <AvarageSellPricesBarChart 
                day1Regular={card.cardmarket.prices.avg1} 
                day7Regular={card.cardmarket.prices.avg7}  
                day30Regular={card.cardmarket.prices.avg30} 
                day1Holo={card.cardmarket.prices.reverseHoloAvg1} 
                day7Holo={card.cardmarket.prices.reverseHoloAvg7} 
                day30Holo={card.cardmarket.prices.reverseHoloAvg30}
            />
        </div>
    </div>
    <div className='middle_column'>
        <p><strong>Card ID:</strong> {card.id}</p>
        <p><strong>Set:</strong> {card.set.name}</p>
        <p><strong>Series:</strong> {card.set.series}</p>
        <br></br>
        <h3>In collection</h3>
        {cardData && cardData[card.id] && (
            <>
                <p><strong>:</strong> {card.set.series}</p>
                <p><strong>Normal:</strong> {cardData[card.id].rarities.normal}</p>
                <p><strong>Reverse:</strong> {cardData[card.id].rarities.reverse || 0}</p>
                <p><strong>Holo:</strong> {cardData[card.id].rarities.holo || 0}</p>
                <p><strong>Promo:</strong> {cardData[card.id].rarities.promo || 0}</p>
            </>
        )}
        <Button 
            type="primary" 
            style={{backgroundColor: 'orange', borderColor: 'orange'}} 
            onClick={handleClick}
            >
            to Cardmarket
        </Button>
    </div>
    <div className='right_column'>

    </div>
    </div>
</Modal>
)};

export default PokeCardModal;