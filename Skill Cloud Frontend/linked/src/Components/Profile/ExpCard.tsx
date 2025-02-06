import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import ExpInput from './ExpInput';
import { formatDate } from '../../Services/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { successNotification } from '../../Services/NotificationService';
import { changeProfile } from '../../Slices/ProfileSlice';

const ExpCard = (props: any) => {
  const [edit, setEdit] = useState(props.edit || false);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let exp = [...profile.experiences];
    exp.splice(props.index, 1);
    let updatedProfile = { ...profile, experiences: exp };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Experience deleted successfully");
  }

  useEffect(() => {
    setEdit(props.edit);
  }, [props.edit]);

  return !edit ? (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <div className='bg-mine-shaft-800 p-2 rounded-md'>
            <img className='h-7' src={`/Icons/${props.company}.png`} alt='' />
          </div>
          <div>
            <div className='font-semibold'>
              {props.title || 'Unknown Title'}
            </div>
            <div className='text-mine-shaft-300 text-sm'>
              {props.company || 'Unknown Company'} &#x2022;{' '}
              {props.location || 'Unknown Location'}
            </div>
          </div>
        </div>
        <div className='text-mine-shaft-300 text-sm'>
          {formatDate(props.startDate)} - {props.working?"Present":formatDate(props.endDate)}
        </div>
      </div>
      <div className='text-mine-shaft-300 text-sm text-justify'>
        {props.description}
      </div>
      {props.edit && (
        <div className='flex gap-5 mt-2'>
          <Button
            onClick={() => setEdit(true)}
            color='kashmir-blue.4'
            variant='outline'
          >
            Edit
          </Button>
          <Button color='red.8' variant='light' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput
      setEdit={setEdit}
      add={!props.edit}
      {...props} // Ensure all necessary props are passed
    />
  );
};

export default ExpCard;
