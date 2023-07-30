import React, { useState } from 'react';
import { Card, Button, List } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const PokeCard = ({card}) => {
  const [count, setCount] = useState(0);

  return (
    <Card style={{ width: "500px", margin:"10px"}}>
      <div style={{ display: "flex" }}>
        <div>
          <img
            alt="example"
            src={card.images.small}
            style={{ width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
            <Button 
            type="default danger" 
            shape="circle" 
            icon={<MinusOutlined />} 
            onClick={() => setCount(count - 1)} />
            <h2 style={{ margin: 0 }}>{count}</h2>
            <Button type="primary" 
            shape="circle" 
            icon={<PlusOutlined />} 
            onClick={() => setCount(count + 1)}/>
          </div>
        </div>
        <List style={{ width: "100%", marginLeft: "10px" }}>
    <List.Item>
      <List.Item.Meta
        title={`${card.supertype} | ${card.name} | ${card.number}`}
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        title={card.rarity}
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        title={`avg sell: €${card.cardmarket.prices.averageSellPrice} | low: €${card.cardmarket.prices.lowPrice} | trent: €${card.cardmarket.prices.trendPrice}`}
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        title="Item 4"
      />
    </List.Item>
</List>

      </div>
    </Card>
  );
};

export default PokeCard;
