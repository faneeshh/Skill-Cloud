import { ActionIcon, NumberInput } from '@mantine/core';
import {
  IconPencil,
  IconBriefcase,
  IconMapPin,
  IconCheck,
  IconX,
  IconTool,
} from '@tabler/icons-react';
import SelectInput from './SelectInput';
import fields from '../../Data/Profile';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';

const Info = () => {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else setEdit(false);
  };

  const form = useForm({
    initialValues: { jobTitle: '', company: '', location: '', totalExp: 1 },
  });

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification('Success', 'Profile updated successfully');
  };

  return (
    <>
      <div className='flex items-center justify-between text-3xl font-semibold'>
        {user.name}
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              size='lg'
              color='green.8'
              variant='subtle'
            >
              <IconCheck className='h-4/5 w-4/5' stroke={1.5} />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleEdit}
            size='lg'
            color={edit ? 'red.8' : 'kashmir-blue.4'}
            variant='subtle'
          >
            {edit ? <IconX /> : <IconPencil />}
          </ActionIcon>
        </div>
      </div>

      {edit ? (
        <>
          <div className='flex gap-10 [&>*]:w-1/2 my-3'>
            <SelectInput form={form} name='jobTitle' {...select[0]} />
            <SelectInput form={form} name='company' {...select[1]} />
          </div>
          <div className='flex gap-10 [&>*]:w-1/2 my-3'>
            <SelectInput form={form} name='location' {...select[2]} />
            <NumberInput
              label='Experience'
              hideControls
              withAsterisk
              clampBehavior='strict'
              min={1}
              max={40}
              {...form.getInputProps('totalExp')}
            />
          </div>{' '}
        </>
      ) : (
        <>
          <div className='flex items-center gap-1 mt-4 text-xl'>
            <IconBriefcase /> {profile.jobTitle} • {profile.company}
          </div>
          <div className='text-mine-shaft-300 flex items-center gap-1 text-lg'>
            <IconMapPin /> {profile.location}
          </div>
          <div className='text-mine-shaft-300 flex items-center gap-1 text-lg'>
            <IconTool />
            Experience: {profile.totalExp} Years
          </div>
        </>
      )}
    </>
  );
};

export default Info;
