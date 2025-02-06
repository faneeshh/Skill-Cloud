import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import JobDesc from '../Components/JobDesc/JobDesc';
import RecommendedJobs from '../Components/JobDesc/RecommendedJob';
import { useEffect, useState } from 'react';
import { getJob } from '../Services/JobService';

const JobDescPage = () => {
  
  const [job, setJob] = useState<any>(null);
  const {id} = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id).then((res) => {
      setJob(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link className='my-4 inline-block' to={'/find-jobs'}>
        <Button
          leftSection={<IconArrowLeft size={20} />}
          color='kashmir-blue.4'
          variant='light'
        >
          Back
        </Button>
      </Link>
      <div className='flex gap-5 justify-around'>
        <JobDesc {...job} />
        <RecommendedJobs />
      </div>
    </div>
  );
};

export default JobDescPage;
