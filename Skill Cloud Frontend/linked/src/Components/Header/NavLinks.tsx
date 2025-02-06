import { Link, useLocation } from 'react-router-dom';

const NavLinks = () => {
  const links = [
    { name: 'Find Jobs', url: 'find-jobs' },
    { name: 'Find Talent', url: 'find-talent' },
    { name: 'Post Job', url: 'post-job/0' },
    { name: 'Posted Job', url: 'posted-job/0' },
    { name: 'Job History', url: 'job-history' },
  ];

  const location = useLocation();

  return (
    <div className='flex gap-5 text-mine-shaft-400 h-full items-center'>
      {links.map((link, index) => (
        <div
          key={index}
          className={`${
            location.pathname === '/' + link.url
              ? 'border-kashmir-blue-400 text-kashmir-blue-400'
              : 'border-transparent'
          } border-t-[3px] h-full flex items-center`}
        >
          <Link to={`/${link.url}`}>
            {link.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
