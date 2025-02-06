import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../Components/TalentProfile/Profile';
import { profile } from '../Data/TalentData';
import RecommendTalent from '../Components/TalentProfile/RecommendTalent';
import { useEffect, useState } from 'react';
import { getAllProfiles } from '../Services/ProfileService';

const TalentProfilePage = () => {
  
  const navigate = useNavigate();
  const [talents, setTalents] = useState<any[]>([]);

  useEffect(() => {
      getAllProfiles().then((res) => {
        setTalents(res);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link className='my-4 inline-block' to={'/find-talent'}>
        <Button
          my={'sm'}
          onClick={() => navigate(-1)}
          leftSection={<IconArrowLeft size={20} />}
          color='kashmir-blue.4'
          variant='light'
        >
          Back
        </Button>
      </Link>
      <div className='flex gap-5'>
        <Profile {...profile} />
        <RecommendTalent talents={talents} />
      </div>
    </div>
  );
};

export default TalentProfilePage;
