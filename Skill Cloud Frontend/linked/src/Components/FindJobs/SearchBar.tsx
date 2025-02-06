import { Divider, RangeSlider } from '@mantine/core';
import { dropdownData } from '../../Data/JobsData';
import MultiInput from './MultiInput';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([0, 500]);
  const dispatch = useDispatch();
  
  const handleChange = (event:any) => {
      dispatch(updateFilter({salary:event}));
    }

  return (
    <div className='flex px-5 py-8'>
      {dropdownData.map((item, index) => (
        <>
          <div key={index} className='w-1/5'>
            <MultiInput {...item} />
          </div>
          <Divider mr='xs' size='xs' orientation='vertical' />
        </>
      ))}
      <div className='w-1/5 [&_.mantine-Slider-label]:!translate-y-10'>
        <div className='flex text-sm justify-between'>
          <div>Salary</div>
          <div>
            ${value[0]}k - ${value[1]}k
          </div>
        </div>
        <RangeSlider
          onChange={setValue}
          onChangeEnd={handleChange}
          min={50}
          max={500}
          color='kashmir-blue.4'
          size={'xs'}
          value={value}
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
