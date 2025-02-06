import { IconArrowLeft, IconBrandAzure } from '@tabler/icons-react';
import Signup from '../Components/SignupLogin/Signup';
import Login from '../Components/SignupLogin/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden relative">
      <Button
        my={'md'}
        className='!absolute left-5 z-10'
        leftSection={<IconArrowLeft size={20} />}
        color='kashmir-blue.4'
        onClick={() => navigate("/")}
        variant='light'
      >
        Home
      </Button>
      <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname=='/signup'?'-translate-x-1/2':'translate-x-0'}`}>
        <Login/>
        <div className={`w-1/2 h-full transition-all duration-1000 ease-in-out ${location.pathname=="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex items-center gap-5 justify-center flex-col`}>
          <div className='flex gap-2 items-center text-kashmir-blue-400'>
            <IconBrandAzure className='h-16 w-16' stroke={1.5} />
            <div className='text-6xl font-semibold'>SkillCloud</div>
          </div>
          <div className='text-2xl text-mine-shaft-200 font-semibold'>Find the Jobs made for you</div>
        </div>
      <Signup/>
      </div>
    </div>
  );
};

export default SignupPage;
