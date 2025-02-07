import { useState } from 'react';
import {  Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../../Slices/SortSlice';

const opt = [
  'Relevance',
  'Most Recent',
  'Salary: Low to High',
  'Salary: High to Low',
];

const talentSort = [
  'Relevance',
  'Experience: Low to High',
  'Experience: High to Low',
]

const Sort = (props:any) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = props.sort == "job" ? opt.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  )):talentSort.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={150}
      position='bottom-start'
      onOptionSubmit={(val) => {
        dispatch(updateSort(val));
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div
          onClick={() => combobox.toggleDropdown()}
          className=' cursor-pointer border border-kashmir-blue-300 flex gap-2 text-sm items-center px-2 py-1 rounded-xl'
        >
          {selectedItem}
          <IconAdjustments className=' h-5 w-5 text-kashmir-blue-400' />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown >
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Sort;
