import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { formatDate } from '../../Services/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { successNotification } from '../../Services/NotificationService';
import { changeProfile } from '../../Slices/ProfileSlice';

const CertiCard = (props: any) => {

  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let certis = [...profile.certifications];
    certis.splice(props.index, 1); // Remove the certificate
    let updatedProfile = { ...profile, certifications: certis};
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certificate Deleted Successfully");
  }

  return (
    <div className='flex justify-between items-center p-2 bg-mine-shaft-900 rounded-md'>
      <div className='flex gap-2 items-center'>
        <div className='p-2 bg-mine-shaft-800 rounded-md'>
          <img className='h-7' src={`/Icons/${props.issuer}.png`} alt='' />
        </div>
        <div>
          <div className='font-semibold'>{props.name}</div>
          <div className='text-sm text-mine-shaft-300'>{props.issuer}</div>
          <div className='text-sm text-mine-shaft-300'>ID: {props.certificateId}</div>
          <div className='text-sm text-mine-shaft-300'>{formatDate(props.issueDate)}</div>
        </div>
      </div>
      {props.edit && <ActionIcon onClick={handleDelete} size={'lg'} color='red.8' variant='subtle'>
        <IconTrash className='h-4/5 w-4/5' stroke={1.5} />
      </ActionIcon>}
    </div>
  );
};

export default CertiCard;
