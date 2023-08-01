import { Select, Input, Radio } from 'antd';

const { Option } = Select;

const FilterBar = ({ 
    rarity, 
    setRarity, 
    pokemonType,
    setPokemonType,
    setHolo, 
    setPeriod, 
    setComparison, 
    setPrice 
}) => {
    return (
        <div className="filter_bar_container">
            <Select
                style={{ width: '15%' }}
                value={rarity}
                onChange={value => setRarity(value)}
                placeholder="Select a Rarity"
            >
                <Option value="hollow">Hollow</Option>
                <Option value="rare">Rare</Option>
            </Select>

            <Select
                style={{ width: '15%' }}
                value={pokemonType}
                onChange={value => setPokemonType(value)}
                placeholder="Select a Type"
            >
                <Option value="grass">Grass</Option>
                <Option value="fire">Fire</Option>
                <Option value="water">Water</Option>
            </Select>

            <Select
                style={{ width: '15%' }}
                onChange={value => setHolo(value)}
                placeholder="Select Card Type"
            >
                <Option value="normal">Normal</Option>
                <Option value="holo">Holo</Option>
                <Option value="reverseholo">Reverse Holo</Option>
            </Select>

            <Select
                style={{ width: '15%' }}
                onChange={value => setPeriod(value)}
                placeholder="Select Period"
            >
                <Option value="avg1">Last Day</Option>
                <Option value="avg7">Last Week</Option>
                <Option value="avg30">Last Month</Option>
            </Select>

            <Radio.Group
                onChange={event => setComparison(event.target.value)}
                style={{ width: '10%' }}
            >
                <Radio.Button value=">">Greater than</Radio.Button>
                <Radio.Button value="<">Lesser than</Radio.Button>
            </Radio.Group>

            <Input
                style={{ width: '15%' }}
                type="number"
                onChange={e => setPrice(e.target.value)}
                placeholder="Price"
            />
        </div>
    );
};

export default FilterBar;