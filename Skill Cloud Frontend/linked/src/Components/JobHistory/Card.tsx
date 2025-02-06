import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from '@tabler/icons-react';
import { Divider, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../Services/Utilities';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';

const Card = (props: any) => {

  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

   const handleSaveJob = () => {
      let savedJobs:any = [...profile.savedJobs];
      if(savedJobs?.includes(props.id)){
        savedJobs = savedJobs?.filter((id:any) => id !== props.id);
      }else{
        savedJobs = [...savedJobs,props.id];
      }
      let updatedProfile = {...profile, savedJobs:savedJobs};
      dispatch(changeProfile(updatedProfile));
    }

  return ( 
    <div className='bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-kashmir-blue-300'>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <div className='p-1 bg-mine-shaft-800 rounded-md'>
            <img className='h-7' src={`/Icons/${props.company }.png`} alt='' />
          </div>
          <div>
            <div className='font-semibold text-lg'>{props.jobTitle}</div>
            <div className='text-sm text-mine-shaft-300'>
              {props.company} &#x2022; {props.applicants?props.applicants.length:0} Applicants
            </div>
          </div>
        </div>
        {profile.savedJobs?.includes(props.id)?<IconBookmarkFilled className='text-kashmir-blue-400 cursor-pointer' onClick={handleSaveJob}/>:<IconBookmark onClick={handleSaveJob} className='text-mine-shaft-300 cursor-pointer hover:text-kashmir-blue-400' />}
   </div>

      <div className='flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-kashmir-blue-400 [&>div]:rounded-lg text-xs'>
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>

      <Text className='!text-xs !text-mine-shaft-300' lineClamp={3}>
        {props.about}
      </Text>

      <Divider size={'xs'} color='mine-shaft.7' />

      <div className='flex justify-between'>
        <div className='font-semibold text-mine-shaft-200'>{props.packageOffered}</div>
        <div className='flex gap-1 text-mine-shaft-400 text-xs items-center'>
          <IconClockHour3 className='h-3 w-3' stroke={1.5} />
          {props.applied || props.interviewing ?"Applied ":props.offered?"Interviewed ":"Posted "}{timeAgo(props.postTime)}
        </div>
      </div>
      {
        (props.offered || props.interviewing) && <Divider color='mine-shaft.7' size={'xs'} />
      }
    {
        props.offered && <div className='flex gap-2'>
            <Button color='kashmir-blue.4' variant='outline' fullWidth>Accept</Button>
            <Button color='kashmir-blue.4' variant='light' fullWidth>Reject</Button>
        </div>
    }
    {
       props.interviewing && <div className='flex gap-1 text-sm items-center'>
        <IconCalendarMonth className="bg-kashmir-blue-400 w-5 h-5" stroke={1.5} />Sun, 25 August 2024 &bull; <span className='text-mine-shaft-400'>10:00 AM</span>
      </div>
    }
    <Link to={`/jobs/${props.id}`}>
          <Button color='kashmir-blue.4' variant='outline' fullWidth>
            Details
          </Button>
        </Link>
    </div>
  );
}; 

export default Card;