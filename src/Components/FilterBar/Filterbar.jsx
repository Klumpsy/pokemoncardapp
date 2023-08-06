import { Select, Input, Radio, Button } from 'antd';
import { useContext } from 'react';
import OwnerContext from '../../Context/OwnerContext';
import './filterbar.css'

const { Option } = Select;

const FilterBar = ({
    order, setOrder, 
    rarity, setRarity, 
    type, setType,
    holo, setHolo, 
    period, setPeriod, 
    comparison, setComparison, 
    price, setPrice }) => {

    const { setOwner } = useContext(OwnerContext);

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
        <label>rarity</label>
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
          <Option value="grass">Grass</Option>
          <Option value="fighting">Fighting</Option>
          <Option value="dragon">Dragon</Option>
          <Option value="lightning">Lightning</Option>
          <Option value="fairy">Fairy</Option>
          <Option value="psychic">Psychic</Option>
          <Option value="darkness">Darkness</Option>
          <Option value="metal">Metal</Option>
          <Option value="colorless">Normal</Option>
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

        <div className='second_row'>
        <div className='ordering_reset_container'>
          <div className='ordering_button'>
            <Select
              placeholder="Order By"
              value={order}
              onChange={setOrder}>
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </div>

          <div>
            <Button type="primary" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
          <Select
            placeholder="Select an Owner"
            onChange={value => setOwner(value)}
            defaultValue={'bartmartin'}
            >
            <Option value="martin">Martin</Option>
            <Option value="bartmartin">Bart & Martin</Option>
            <Option value="ronald">Ronald</Option>
        </Select>
        </div>
      </div>
    );
  }
  
  export default FilterBar;