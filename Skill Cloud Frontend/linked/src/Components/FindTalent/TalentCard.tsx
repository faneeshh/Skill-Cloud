import { IconCalendarMonth, IconHeart, IconMapPin } from '@tabler/icons-react';
import { Avatar, Button, Divider, Modal, Text } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { getProfile } from '../../Services/ProfileService';
import { changeAppStatus } from '../../Services/JobService';
import {
  errorNotification,
  successNotification,
} from '../../Services/NotificationService';
import { formatInterviewTime, openBase64PDF } from '../../Services/Utilities';

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const ref = useRef<HTMLInputElement>(null);
  const { id } = useParams();

  useEffect(() => {
    if (props.applicantId)
      getProfile(props.applicantId)
        .then((res) => setProfile(res))
        .catch((err) => console.log(err));
    else {
      setProfile(props);
    }
  }, [props]);

  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
      interviewTime: date
    };

    if(status == "INTERVIEWING") {
      const [hours, minutes] = time.split(':').map(Number);
      date?.setHours(hours, minutes);
      interview = {...interview, interviewTime: date};
    }

    changeAppStatus(interview)
      .then((_res) => {
        if(status == "INTERVIEWING") successNotification(
          'Interview Scheduled',
          'Interview Scheduled Successfully'
        );

        else if(status == "OFFERED") successNotification(
          "Offered",
          "Offer Sent Successfully"
        );
        
        else successNotification(
          "Rejected",
          "Applicant has been Rejected"
        )
        window.location.reload();
      })
      .catch((_err) => errorNotification('Error', 'Error Scheduling Interview'));
  };

  return (
    <div className='bg-mine-shaft-900 ml-2 mr-2 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-kashmir-blue-300'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <div className='bg-mine-shaft-800 p-1 rounded-lg'>
            <Avatar
              size={'lg'}
              // src={
              //   profile?.picture
              //     ? `data:image/jpeg;base64,${profile?.picture}`
              //     : `/avatar6.png`
              // }
              alt=''
            />
          </div>
          <div>
            <div className='text-lg font-semibold'>{props.name}</div>
            <div className='text-mine-shaft-300 text-sm'>
              {profile?.jobTitle} &#x2022; {profile?.company}
            </div>
          </div>
        </div>
        <IconHeart className='text-mine-shaft-300 cursor-pointer' />
      </div>
      <div
        className='flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-kashmir-blue-400
            [&>div]:rounded-lg text-xs'
      >
        {profile?.skills?.map(
          (skill: any, index: any) =>
            index < 4 && (
              <div
                key={index}
                className='bg-mine-shaft-800 text-kashmir-blue-400 px-2 py-1 text-xs rounded-lg'
              >
                {skill}
              </div>
            )
        )}
      </div>
      <Text className='!text-xs  !text-mine-shaft-300' lineClamp={3}>
        {profile.about}
      </Text>
      <Divider size={'xs'} color='mine-shaft.7' />
      {props.invited ? (
        <div className='text-mine-shaft-200 flex items-center gap-1 text-sm'>
          <IconCalendarMonth stroke={1.5} /> Interview: {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className='flex justify-between'>
          <div className='text-mine-shaft-300'>Exp: {props.totalExp?props.totalExp:2} Years</div>
          <div className='text-mine-shaft-400 flex items-center gap-1 text-xs'>
            <IconMapPin className='w-3 h-3' stroke={1.5} /> {profile.location}
          </div>
        </div>
      )}

      <Divider size={'xs'} color='mine-shaft.7' />
      <div className='flex [&>*]:w-1/2 [&>*]:p-1'>
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color='kashmir-blue.4' variant='outline' fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarMonth className='w-5 h-5' />}
                  color='kashmir-blue.4'
                  variant='light'
                  fullWidth
                >
                  Schedule
                </Button>
              ) : (
                <Button color='kashmir-blue.4' variant='light' fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button color='kashmir-blue.4' onClick={() => handleOffer("OFFERED")} variant='outline' fullWidth>
                Accept
              </Button>
            </div>
            <div>
              <Button color='kashmir-blue.4' onClick={() => handleOffer("REJECTED")} variant='light' fullWidth>
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {
        (props.invited || props.posted) && <Button color='kashmir-blue.4' variant='filled' fullWidth onClick={openApp} autoContrast>View Application</Button>
      }
      <Modal
        opened={opened}
        onClose={close}
        title='Schedule Interview'
        centered
      >
        <div className='flex flex-col gap-4'>
          <DateInput
            value={date}
            minDate={new Date()}
            onChange={setDate}
            label='Date'
            placeholder='Enter Date'
          />
          <TimeInput
            label='Time'
            value={time}
            onChange={(event) => setTime(event.currentTarget.value)}
            ref={ref}
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            onClick={() => handleOffer('INTERVIEWING')}
            color='kashmir-blue.4'
            variant='light'
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal
        opened={app}
        onClose={closeApp}
        title='Application'
        centered
      >
        <div className='flex flex-col gap-4'>
          <div>
            Email: &emsp; <a className='text-kashmir-blue-400 hover:underline cursor-pointer text-center' href={`mailto:${props.email}`}>{props.email}</a>
          </div>
          <div>
            Website: &emsp; <a target='_blank' className='text-kashmir-blue-400 hover:underline cursor-pointer text-center' href={props.website}>{props.website}</a>
          </div>
          <div>
            Website: &emsp; <span className='text-kashmir-blue-400 hover:underline cursor-pointer text-center' onClick={() => {
              openBase64PDF(props.resume)
            }}>{props.name}</span>
          </div>
          <div>
            Cover Letter: &emsp; <div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
