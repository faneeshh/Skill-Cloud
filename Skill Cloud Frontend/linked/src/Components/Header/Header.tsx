import { Button } from '@mantine/core';
import {IconCode } from '@tabler/icons-react';
import NavLinks from './NavLinks';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../../Services/ProfileService';
import { setProfile } from '../../Slices/ProfileSlice';
import NotificationMenu from './NotificationMenu';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user) {
      getProfile(user.id)
        .then((data: any) => {
          dispatch(setProfile(data));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [dispatch, user]);

  const location = useLocation();
  return location.pathname !== '/signup' && location.pathname !== '/login' ? (
    <div className="w-full bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center font-['poppins']">
      <div className='text-kashmir-blue-400 flex items-center gap-2'>
        <IconCode className='w-10 h-10' stroke={2} />
        <div className='text-2xl font-semibold'>SkillCloud</div>
      </div>

      {NavLinks()}

      <div className='flex items-center gap-3'>
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to='/login'>
            <Button variant='outline' color='kashmir-blue.4'>
              Login
            </Button>
          </Link>
        )}

        {user?<NotificationMenu/>:<></>}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Header;
