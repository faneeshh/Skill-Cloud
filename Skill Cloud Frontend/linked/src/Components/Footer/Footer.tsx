import {
  IconBrandAzure,
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandX,
  IconCode,
  IconLeaf,
} from '@tabler/icons-react';
import { footerLinks } from '../../Data/Data';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  return location.pathname != '/signup' && location.pathname != '/login' ? (
    <div className="pt-20 pb-5 flex gap-5 justify-around bg-mine-shaft-950 font-['poppins']">
      <div className='w-1/4 flex flex-col gap-4'>
        <div className='flex gap-2 items-center text-kashmir-blue-400'>
          <IconCode className='h-7 w-7' stroke={2} />
          <div className='text-xl font-semibold'>SkillCloud</div>
        </div>
        <div className='text-sm text-mine-shaft-300'>
          Job portal with user profiles, skill updates, certifications, work
          experience and admin job postings
        </div>
        <div
          className='flex gap-3 text-kashmir-blue-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full 
        hover:[&>div]:bg-mine-shaft-700 cursor-pointer'
        >
          <div>
            <IconBrandDiscord />
          </div>
          <div>
            <IconBrandInstagram />
          </div>
          <div>
            <IconBrandX />
          </div>
        </div>
      </div>
      {footerLinks.map((item, index) => (
        <div key={index}>
          <div className='text-lg font-semibold mb-4 text-kashmir-blue-400'>
            {item.title}
          </div>
          {item.links.map((link, index) => (
            <div
              key={index}
              className='text-mine-shaft-300 text-sm hover:text-kashmir-blue-400
                cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out'
            >
              {link}
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default Footer;
