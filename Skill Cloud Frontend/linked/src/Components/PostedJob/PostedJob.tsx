import { Tabs, TabsList, TabsTab } from '@mantine/core';
import PostedJobCard from './PostedJobCard';
import { useEffect, useState } from 'react';
import PostedJobDesc from './PostedJobDesc';

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>('ACTIVE');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || 'ACTIVE');
    setSelectedJob(props.job);
  }, [props.job]);

  const handleJobCardClick = (job: any) => {
    setSelectedJob(job);
  };

  return (
    <div className='flex'>
      <div className='w-1/5 mt-5'>
        <div className='text-2xl font-semibold mb-5'></div>
        <div>
          <Tabs autoContrast variant='pills' value={activeTab} onChange={setActiveTab}>
            <TabsList className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
              <TabsTab value='ACTIVE'>Active [{props.jobList?.filter((job: any) => job?.jobStatus === "ACTIVE").length}]</TabsTab>
              <TabsTab value='DRAFT'>Drafts [{props.jobList?.filter((job: any) => job?.jobStatus === "DRAFT").length}]</TabsTab>
              <TabsTab value='CLOSED'>Closed [{props.jobList?.filter((job: any) => job?.jobStatus === "CLOSED").length}]</TabsTab>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex flex-col flex-wrap mt-5 gap-5'>
          {
            props.jobList?.filter((job: any) => job?.jobStatus === activeTab).map((item: any, index: any) =>
              <PostedJobCard
                key={index}
                {...item}
                isSelected={item.id === selectedJob?.id}
                onClick={() => handleJobCardClick(item)}
              />
            )
          }
        </div>
      </div>
      <div className='w-5/6 mt-5'>
        {selectedJob ? (
          <PostedJobDesc {...selectedJob} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PostedJob;