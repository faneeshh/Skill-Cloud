import { Divider, Input, RangeSlider } from '@mantine/core';
import { useState } from 'react';
import { searchFields } from '../../Data/TalentData';
import MultiInput from '../FindJobs/MultiInput';
import { IconUserCircle } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  
  const handleChange = (name:any, event:any) => {
      if(name === 'exp') dispatch(updateFilter({exp:event}));
      else {
        setName(event.currentTarget.value);
        dispatch(updateFilter({name:event.currentTarget.value}));
      }
    }

  return (
    <div className='flex px-5 py-8 items-center !text-mine-shaft-100'>
      <div className='flex items-center'>
        <div className='text-kashmir-blue-400 bg-kashmir-blue-900 rounded-full p-1 mr-2'>
          <IconUserCircle size={20} />
        </div>
        <Input
          defaultValue={name}
          onChange={(event) => handleChange('name', event)}
          className='[&_input]:!placeholder-mine-shaft-200'
          variant='unstyled'
          placeholder='Talent Name'
        />
      </div>
      {searchFields.map((item, index) => (
        <>
          <div key={index} className='w-1/5'>
            <MultiInput {...item} />
          </div>
          <Divider mr='xs' size='xs' orientation='vertical' />
        </>
      ))}
      <div className='w-1/5 [&_.mantine-Slider-label]:!translate-y-10'>
        <div className='flex text-sm justify-between'>
          <div>Experience (Years)</div>
          <div>
            {value[0]} - {value[1]}
          </div>
        </div>
        <RangeSlider
          min={1}
          max={50}
          minRange={1}
          color='kashmir-blue.4'
          size={'xs'}
          onChangeEnd={(e) => handleChange('exp', e)}
          value={value}
          onChange={setValue}
          labelTransitionProps={{
            transition: 'skew-down',
            duration: 150,
            timingFunction: 'linear',
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
