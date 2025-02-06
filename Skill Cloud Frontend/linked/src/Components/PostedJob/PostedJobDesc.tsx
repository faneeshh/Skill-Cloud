import { Badge, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import JobDesc from '../JobDesc/JobDesc';
import TalentCard from '../FindTalent/TalentCard';
import { useEffect, useState } from 'react';

const PostedJobDesc = (props: any) => {

  const [tab, setTab] = useState('overview');
  const [arr, setArr] = useState<any>([]);

  const handleTabChange = (value: any) => {
    
    setTab(value);
    if(value == 'applicants'){
      setArr(props.applicants?.filter((x:any) => x.applicationStatus == "APPLIED"));
    }else if(value == 'invited'){
      setArr(props.applicants?.filter((x:any) => x.applicationStatus == "INTERVIEWING"));
    }else if(value == 'offered'){
      setArr(props.applicants?.filter((x:any) => x.applicationStatus == "OFFERED"));
    }else if(value == 'rejected'){
      setArr(props.applicants?.filter((x:any) => x.applicationStatus == "REJECTED"));
    }
  };

  useEffect(() => {
    handleTabChange("overview");
  },[props])

  return (
    <div className='w-full px-5 mt-5'>
    {props.jobTitle?<><div className='flex items-center text-2xl font-semibold'>
        {props.jobTitle}
        <Badge variant='light' ml={'sm'} color='kashmir-blue.3' size='sm'>
          {props.jobStatus}
        </Badge>
      </div>
      <div className='text-mine-shaft-300 mb-5 font-medium'>
        {props.location}
      </div>
      <div>
        <Tabs value={tab} onChange={handleTabChange} variant='outline' autoContrast radius='lg' defaultValue='overview'>
          <TabsList className="[&_button[data-active='true']]:!border-b-mine-shaft-950 [&_button]:!text-xl font-semibold mb-5 [&_button[data-active='true']]:text-kashmir-blue-400">
            <TabsTab value='overview'>Overview</TabsTab>
            <TabsTab value='applicants'>Applicants</TabsTab>
            <TabsTab value='invited'>Invited</TabsTab>
            <TabsTab value='offered'>Offered</TabsTab>
            <TabsTab value='rejected'>Rejected</TabsTab>
          </TabsList>

          <div className='min-w-full'>
            <TabsPanel value='overview' className='[&>div]:w-full'>
              <JobDesc {...props} edit={true} closed={props.jobStatus == "CLOSED"} />
            </TabsPanel>
            <TabsPanel value='applicants' className='[&>div]:w-full'>
              <div className='flex flex-wrap justify-around gap-5 mt-10'>
                {
                   arr?.length?arr.map((talent:any, index:any) => <TalentCard key={index} {...talent} posted = {true} />):<div className='text-2xl min-h[70vh] flex justify-center items-center font-semibold'>No Applicants</div>
                }
              </div>
            </TabsPanel>

            <TabsPanel value='invited' className='[&>div]:w-full'>
              <div className='flex flex-wrap justify-around gap-5 mt-10'>
                {
                   arr?.length?arr.map((talent:any, index:any) => (
                    <TalentCard key={index} {...talent} invited={true} />)): <div className='text-2xl min-h[70vh] flex justify-center items-center font-semibold'>No Invited Candidates</div>
                  
                }
              </div>
            </TabsPanel>

            <TabsPanel value='offered' className='[&>div]:w-full'>
              <div className='flex flex-wrap justify-around gap-5 mt-10'>
                {
                    arr?.length?arr.map((talent:any, index:any) => (
                    <TalentCard key={index} {...talent} offered={true} />)):<div className='text-2xl min-h[70vh] flex justify-center items-center font-semibold'>No Offered Candidates</div>
                }
              </div>
            </TabsPanel>
            <TabsPanel value='rejected' className='[&>div]:w-full'>
              <div className='flex flex-wrap justify-around gap-5 mt-10'>
                {
                    arr?.length?arr.map((talent:any, index:any) => (
                    <TalentCard key={index} {...talent} rejected={true} />)):<div className='text-2xl min-h[70vh] flex justify-center items-center font-semibold'>No Rejected Candidates</div>
                }
              </div>
            </TabsPanel>
          </div>
        </Tabs>
      </div>
      </>: <div className='text-2xl min-h[70vh] flex justify-center items-center font-semibold'>No Job Selected</div> }
    </div>
  );
};

export default PostedJobDesc;