import { useEffect, useState } from 'react';
import fields from '../../Data/Profile';
import SelectInput from './SelectInput';
import { Button, Checkbox, Textarea } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';

const ExpInput = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!props.add)
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        desc: props.desc,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
      });
  },[]);

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      title: '',
      company: '',
      location: '',
      desc: '',
      startDate: new Date(),
      endDate: new Date(),
      working: false,
    },
    validate: {
      title: (value) => {
        if (!value) return 'Title is required';
      },
      company: (value) => {
        if (!value) return 'Company is required';
      },
      location: (value) => {
        if (!value) return 'Location is required';
      },
      desc: (value) => {
        if (!value) return 'Description is required';
      },
      startDate: (value) => {
        if (!value) return 'Start Date is required';
      },
      endDate: (value) => {
        if (!value) return 'End Date is required';
      },
    },
  });
  const [desc, setDesc] = useState(
    'As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process.'
  );

  const handleSave = () => {
    form.validate();
    if(!form.isValid) return;
    let exp = [...profile.experiences]
    if(props.add){
       exp.push(form.getValues());
       exp[exp.length - 1].startDate = exp[exp.length - 1].startDate.toISOString(); 
       exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
    }
    else {
       exp[props.index] = form.getValues();
       exp[props.index].startDate = exp[props.index].startDate.toISOString();
       exp[props.index].endDate = exp[props.index].endDate.toISOString();
    }
    let updatedProfile = {...profile, experiences: exp};
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification('Success',`Experience ${props.add?"Added":"Updated"} Successfully`);
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-lg font-semibold'>
        {props.add ? 'Add' : 'Edit'} Experience
      </div>
      <div className='flex gap-10 [&>*]:w-1/2'>
        <SelectInput form={form} name='title' {...select[0]} />
        <SelectInput form={form} name='company' {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea
        {...form.getInputProps('desc')}
        value={desc}
        withAsterisk
        label='Summary'
        placeholder='Enter Summary...'
        autosize
        minRows={3}
        onChange={(e) => setDesc(e.currentTarget.value)}
      />
      <div className='flex gap-10 [&>*]:w-1/2'>
        <MonthPickerInput
          {...form.getInputProps('startDate')}
          withAsterisk
          maxDate={form.getValues().endDate || undefined}
          label='Start Date'
          placeholder='Pick date'
          value={startDate}
          onChange={setStartDate}
        />
        <MonthPickerInput
          {...form.getInputProps('endDate')}
          disabled={form.getValues().working}
          withAsterisk
          minDate={form.getValues().startDate || undefined}
          maxDate={new Date()}
          label='End Date'
          placeholder='Pick date'
        />
      </div>
      <Checkbox
        {...form.getInputProps('working')}
        checked={form.getValues().working}
        className='mt-4'
        onChange={(event) => form.setFieldValue('working', event.currentTarget.checked)}
        autoContrast
        label='Currently working here'
      />
      <div className='flex gap-5 mt-2'>
        <Button
          onClick={handleSave}
          color='green.8'
          variant='light'
        >
          Save
        </Button>
        <Button
          color='red.8'
          onClick={() => props.setEdit(false)}
          variant='light'
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExpInput;
