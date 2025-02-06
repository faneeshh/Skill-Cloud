import { ActionIcon, Textarea } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';

const About = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("");

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } else setEdit(false);
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, about: about };
    dispatch(changeProfile(updatedProfile));
    successNotification('Success', 'Profile updated successfully');
  }

  return (
    <div className='px-3'>
      <div className='flex justify-between mb-3 text-2xl font-semibold'>
        About
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
            color={edit ?'red.8':'kashmir-blue.4'}
            variant='subtle'
          >
            {edit ? <IconX /> : <IconPencil />}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <Textarea
          value={about}
          placeholder='Tell something about yourself'
          autosize
          minRows={3}
          onChange={(e) => setAbout(e.currentTarget.value)}
        />
      ) : (
        <div className='text-mine-shaft-300 text-sm text-justify'>
          {profile.about}
        </div>
      )}
    </div>
  );
};

export default About;
