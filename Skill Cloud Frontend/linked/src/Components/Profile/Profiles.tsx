import { Avatar, Divider, FileInput, Overlay } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import Info from './Info';
import { changeProfile } from '../../Slices/ProfileSlice';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import { useHover } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { successNotification } from '../../Services/NotificationService';
import { getBase64 } from '../../Services/Utilities';
import Certificate from './Certificate';

const Profiles = () => {
const dispatch = useDispatch();
const profile = useSelector((state: any) => state.profile);

  const { hovered, ref } = useHover();
  const handleFileChange = async (image:any) => {
      let picture:any = await getBase64(image);
      let updatedProfile = {...profile, picture:picture.split(',')[1]};
      dispatch(changeProfile(updatedProfile));
      successNotification('Success', 'Profile picture updated successfully');
  }

  return (
    <div className="w-4/5 mx-auto">
      <div>
        {/* Banner and Avatar Section */}
        <div className="relative">
          <img
            className="rounded-t-2xl"
            src="/Profile/banner.jpg"
            alt="Profile Banner"
          />
          <div
            ref={ref}
            className="absolute items-center justify-center -bottom-1/3 left-3"
          >
            <div className="relative">
              <Avatar
                className="!w-48 !h-48 border-l-mine-shaft-950 border-8 rounded-full"
                src={profile.picture?`data:image/jpeg;base64, ${profile.picture}`:"/avatar6.png"}
                alt="Profile Avatar"
              />
              {hovered && (
                <>
                  <Overlay
                    className="!rounded-full"
                    color="#000"
                    backgroundOpacity={0.5}
                  />
                  <IconEdit
                    className="absolute z-10 text-mine-shaft-100 !w-16 !h-16"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '1.5rem',
                    }}
                  />
                </>
              )}
              {
                hovered && <FileInput onChange={handleFileChange} className='absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full !w-full'  style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.5rem',
                }} accept='image/png,image/jpeg' variant='transparent' />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="px-3 mt-32">
        <Info />
        <Divider mx="xs" my="xl" />
        <About />
        <Divider mx="xs" my="xl" />
        <Skills />
        <Divider mx="xs" my="xl" />
        <Experience />
      </div>
    </div>
  );
};

export default Profiles;
