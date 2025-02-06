import { Tabs, TabsList, TabsTab, TabsPanel } from '@mantine/core';
import Card from './Card';
import { act, useEffect, useState } from 'react';
import { getAllJobs } from '../../Services/JobService';
import { useSelector } from 'react-redux';

const JobHistory = () => {
  const [activeTab, setActiveTab] = useState<any>('APPLIED');
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);

  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res);
      setShowList(res.filter((job:any) => {
        let found = false;
        job.applicants?.forEach((applicant:any) => {
          if(applicant.applicantId == user.id && applicant.applicationStatus == "APPLIED"){
            found = true;
          }
        });
        return found;
      }))
    }).catch((err) => {
      console.log(err);
    })
  },[]);

  const handleTabChange = (value: string | null) => {
      setActiveTab(value);
      if(value === 'SAVED'){
        setShowList(jobList.filter((job:any) => profile.savedJobs?.includes(job.id)));
      } else {
        setShowList(jobList.filter((job:any) => {
          let found = false;
          job.applicants?.forEach((applicant:any) => {
            if(applicant.applicantId == user.id && applicant.applicationStatus == value){
              found = true;
            }
          });
          return found;
        }))
      }
  }

  return (
    <div>
      <div>
        <Tabs variant='outline' radius='lg' value={activeTab} onChange={handleTabChange}>
          <TabsList className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-kashmir-blue-400">
            <TabsTab value='APPLIED'>Applied</TabsTab>
            <TabsTab value='SAVED'>Saved</TabsTab>
            <TabsTab value='OFFERED'>Offered</TabsTab>
            <TabsTab value='INTERVIEWING'>Interviewing</TabsTab>
          </TabsList>

          <TabsPanel value={activeTab}>
            <div className='mt-10 flex flex-wrap gap-10'>
              {showList.map((job:any, index:any) => (
                <Card key={index} {...job} {...{[activeTab.toLowerCase()]:true}} />
              ))}
            </div>
          </TabsPanel>
            
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;