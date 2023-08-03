import { Select, Input, Radio, Button } from 'antd';

const { Option } = Select;

const FilterBar = ({
    order, setOrder, 
    rarity, setRarity, 
    type, setType,
    holo, setHolo, 
    period, setPeriod, 
    comparison, setComparison, 
    price, setPrice }) => {
  
    const resetFilters = () => {
      setRarity(null);
      setType(null);
      setHolo(null);
      setPeriod(null);
      setComparison(null);
      setPrice('');
      setOrder('asc');
    };
  
    return (
      <div className="filter-bar">
        <Select
          style={{ width: '15%' }}
          placeholder="Select a Rarity"
          value={rarity || 'No filter'}
          onChange={value => setRarity(value === 'No filter' ? null : value)}>
          <Option value="No filter">No Filter</Option>
          <Option value="rare">Rare</Option>
          {/* Add more options if needed */}
        </Select>
  
        <Select
          style={{ width: '15%' }}
          placeholder="Select a Type"
          value={type || 'No filter'}
          onChange={value => setType(value === 'No filter' ? null : value)}>
          <Option value="No filter">No Filter</Option>
          <Option value="fire">Fire</Option>
          <Option value="water">Water</Option>
          {/* Add more options if needed */}
        </Select>
  
        <Select
          style={{ width: '15%' }}
          value={holo || 'No filter'}
          onChange={value => setHolo(value === 'No filter' ? null : value)}>
          <Option value="No filter">No Filter</Option>
          <Option value="holo">Holo</Option>
          <Option value="reverseHolo">Reverse Holo</Option>
        </Select>
    
        <Select
          style={{ width: '15%' }}
          value={period || 'No filter'}
          onChange={value => setPeriod(value === 'No filter' ? null : value)}>
          <Option value="No filter">No Filter</Option>
          <Option value="avg1">Average 1</Option>
          <Option value="avg7">Average 7</Option>
          <Option value="avg30">Average 30</Option>
        </Select>
  
        <Radio.Group value={comparison || ''} 
                     onChange={(e)=> setComparison(e.target.value === '' ? null : e.target.value)}>
          <Radio.Button value="">No Filter</Radio.Button>
          <Radio.Button value=">">&#60;</Radio.Button>
          <Radio.Button value="<">&#62;</Radio.Button>
        </Radio.Group>
  
        <Input
          style={{ width: '15%' }}
          placeholder="Price"
          value={price || ''}
          onChange={(e)=> setPrice(e.target.value)}>
        </Input>

        <Select
        style={{ width: '15%' }}
        placeholder="Order By"
        value={order}
        onChange={setOrder}>
        <Option value="asc">Ascending</Option>
        <Option value="desc">Descending</Option>
      </Select>
  
        <Button type="primary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    );
  }
  
  export default FilterBar;