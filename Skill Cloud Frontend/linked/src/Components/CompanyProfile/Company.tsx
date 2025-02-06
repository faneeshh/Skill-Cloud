import {
  Avatar,
  AvatarGroup,
  Divider,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import AboutComp from './AboutComp';
import CompanyJobs from './CompanyJobs';
import CompanyEmployees from './CompanyEmployees';

const Company = () => {
  return (
    <div className='w-3/4'>
      <div className='relative'>
        <img className='rounded-t-2xl' src='/Profile/banner.jpg' alt='' />
        <img
          className='w-36 h-36 rounded-3xl -bottom-1/4 absolute left-5 
            border-l-mine-shaft-950 border-8 bg-mine-shaft-950'
          src='/Icons/Google.png'
          alt=''
        />
      </div>
      <div className='px-3 mt-20'>
        <div className='text-3xl font-semibold flex justify-between'>
          Google
          <AvatarGroup>
            <Avatar src={'avatar4.png'} />
            <Avatar src={'avatar10.png'} />
            <Avatar src={'avatar6.png'} />
            <Avatar>+10k</Avatar>
          </AvatarGroup>
        </div>
        <div className='flex gap-1 text-mine-shaft-300 text-lg items-center'>
          <IconMapPin className='h-3 w-3' stroke={1.5} /> Tokyo, Japan
        </div>
      </div>
      <Divider mx={'xs'} my='xl' />
      <div>
        <Tabs variant='outline' radius='lg' defaultValue='about'>
          <TabsList className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-kashmir-blue-400">
            <TabsTab value='about'>About</TabsTab>
            <TabsTab value='jobs'>Jobs</TabsTab>
            <TabsTab value='employees'>Employees</TabsTab>
          </TabsList>

          <TabsPanel value='about'><AboutComp/></TabsPanel>
          <TabsPanel value='jobs'><CompanyJobs/></TabsPanel>
          <TabsPanel value='employees'><CompanyEmployees/></TabsPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Company;
