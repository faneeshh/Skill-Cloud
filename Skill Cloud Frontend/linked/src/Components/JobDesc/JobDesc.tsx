import { ActionIcon, Button, Divider } from '@mantine/core';
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { card } from '../../Data/JobDescData';
import DOMPurify from 'dompurify';
import { timeAgo } from '../../Services/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { useEffect, useState } from 'react';
import { postJob } from '../../Services/JobService';
import {
  errorNotification,
  successNotification,
} from '../../Services/NotificationService';

const JobDesc = (props: any) => {
  if (!props || !props.jobTitle) {
    return null; // Do not render if job details are not provided
  }

  const data = DOMPurify.sanitize(props.description || '');
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [applied, setApplied] = useState(false);

  const handleSaveJob = () => {
    let savedJobs: any = [...profile.savedJobs];
    if (savedJobs?.includes(props.id)) {
      savedJobs = savedJobs?.filter((id: any) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    let updatedProfile = { ...profile, savedJobs: savedJobs };
    dispatch(changeProfile(updatedProfile));
  };

  useEffect(() => {
    if (
      props.applicants?.filter(
        (applicant: any) => applicant.applicantId === user.id
      ).length > 0
    ) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [props.applicants, user.id]);

  const handleClose = () => {
    postJob({ ...props, jobStatus: 'CLOSED' })
      .then((_res) => {
        successNotification('Success', 'Job Closed Successfully');
      })
      .catch((_err) => {
        errorNotification('Error', 'Error Closing Job');
      });
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <div className='bg-mine-shaft-800 rounded-xl p-3'>
            <img className='h-14' src={`/Icons/${props.company}.png`} alt='' />
          </div>
          <div>
            <div className='text-2xl font-semibold'>{props.jobTitle}</div>
            <div className='text-mine-shaft-300 text-lg'>
              {props.company} &bull; {timeAgo(props.postTime)} &bull;{' '}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
          {(props.edit || !applied) && (
            <Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
              <Button color='kashmir-blue.4' size='sm' variant='light'>
                {props.closed ? 'Reopen' : props.edit ? 'Edit' : 'Apply'}
              </Button>
            </Link>
          )}
          {!props.edit && applied && (
            <Button color='green.8' size='sm' variant='light'>
              Applied
            </Button>
          )}
          {props.edit && !props.closed ? (
            <Button
              color='red.4'
              onClick={handleClose}
              size='sm'
              variant='light'
            >
              Close
            </Button>
          ) : profile.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              className='text-kashmir-blue-400 cursor-pointer'
              onClick={handleSaveJob}
            />
          ) : (
            <IconBookmark
              onClick={handleSaveJob}
              className='text-mine-shaft-300 hover:text-kashmir-blue-400 cursor-pointer'
            />
          )}
        </div>
      </div>
      <Divider my={'xl'} />
      <div className='flex justify-between'>
        {card.map((item: any, index: number) => (
          <div key={index} className='flex flex-col items-center gap-1'>
            <ActionIcon
              color='kashmir-blue.4'
              className='!h-12 !w-12 '
              variant='light'
              radius={'xl'}
              aria-label='Settings'
            >
              <item.icon className='h-4/5 w-4/5' stroke={1.5} />
            </ActionIcon>
            <div className='text-mine-shaft-300 text-sm'>{item.name}</div>
            <div className='font-semibold'>
              {props[item.id] ? props[item.id] : 'NA'}{' '}
              {item.id === 'packageOffered' && <>k</>}
            </div>
          </div>
        ))}
      </div>
      <Divider my={'xl'} />
      <div>
        <div className='mb-5 text-xl font-semibold'>Required Skills</div>
        <div className='flex flex-wrap gap-2'>
          {props.skillsRequired?.map((item: any, index: number) => (
            <ActionIcon
              key={index}
              color='kashmir-blue.4'
              className='!h-fit !w-fit font-medium !text-sm'
              variant='light'
              p={'xs'}
              radius={'xl'}
              aria-label='Settings'
            >
              {item}
            </ActionIcon>
          ))}
        </div>
      </div>
      <Divider my={'xl'} />
      <div
        className='[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200
      [&_p]:text-justify [&_*]:text-mine-shaft-300 [&_li]:marker:text-kashmir-blue-400 [&_li]:mb-1 '
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      <Divider my={'xl'} />
      <div>
        <div className='mb-5 text-xl font-semibold'>About Company</div>
        <div className='flex justify-between mb-3'>
          <div className='flex items-center gap-2'>
            <div className='bg-mine-shaft-800 rounded-xl p-3'>
              <img className='h-8' src={`/Icons/${props.company}.png`} alt='' />
            </div>
            <div className='flex flex-col'>
              <div className='text-lg font-medium'>{props.company}</div>
              <div className='text-mine-shaft-300'>10k+ Employees</div>
            </div>
          </div>
          <Link to={`/company/${props.company}`}>
            <Button color='kashmir-blue.4' variant='light'>
              Company Page
            </Button>
          </Link>
        </div>
        <div className='text-mine-shaft-300 text-justify'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          fuga provident quis explicabo error. Animi reprehenderit deserunt
          voluptatum, earum soluta placeat odio necessitatibus blanditiis error
          provident sint fugiat dignissimos suscipit ratione iusto est non
          doloremque at quam repudiandae veritatis inventore?
        </div>
      </div>
    </div>
  );
};

export default JobDesc;
