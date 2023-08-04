import React from 'react';
import { Badge } from 'antd';
import "./ownerBadge.css";



const OwnerBadge = ({ owner }) => {
    const badgeContent = owner === 'ronald' ? 'R' : owner === 'bartmartin' ? 'BM' : 'M';
    const badgeColor = owner === 'ronald' ? '#33FF9F' : owner === 'bartmartin' ? '#FFCE33' : '#33CAFF';

  return (
    <Badge 
    count={badgeContent} 
    className={`owner-badge color_${owner}`} 
    style={{ backgroundColor: badgeColor, color: 'white' }} 
    showZero
    />
  );
};

export default OwnerBadge;