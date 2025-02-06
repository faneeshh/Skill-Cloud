import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";


const Jobs = () => {

  const [jobList, setJobList] = useState([{}]);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const[filteredJobs, setFilteredJobs] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        dispatch(resetFilter());
        dispatch(resetSort());
        setJobList(res.filter((job:any) => job.jobStatus === 'ACTIVE'));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
      if(sort == "Most Recent"){
        setJobList([...jobList].sort((a:any,b:any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));
      } 
      
      else if(sort == "Salary: Low to High"){
        setJobList([...jobList].sort((a:any,b:any) => a.packageOffered - b.packageOffered));
      }

      else if(sort == "Salary: High to Low"){
        setJobList([...jobList].sort((a:any,b:any) => b.packageOffered - a.packageOffered));
      }
  },[sort]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        dispatch(resetFilter());
        setJobList(res.filter((job:any) => job.jobStatus === 'ACTIVE'));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let filterJob = jobList;

    if(filter["Job Title"] && filter["Job Title"].length > 0) {
      filterJob = filterJob.filter((job:any) => 
        filter["Job Title"]?.some((title:any) => job.jobTitle?.toLowerCase().includes(title.toLowerCase()))
      );
    }

    if(filter.Location && filter.Location.length > 0) {
      filterJob = filterJob.filter((job:any) => 
        filter.Location?.some((location:any) => job.location?.toLowerCase().includes(location.toLowerCase()))
      );
    }

    if(filter.Experience && filter.Experience.length > 0) {
      filterJob = filterJob.filter((job:any) => 
        filter.Experience?.some((experience:any) => job.experience?.toLowerCase().includes(experience.toLowerCase()))
      );
    }

    if(filter["Job Type"] && filter["Job Type"].length > 0) {
      filterJob = filterJob.filter((job:any) => 
        filter["Job Type"]?.some((type:any) => job.jobType?.toLowerCase().includes(type.toLowerCase()))
      );
    }

    if(filter.salary && filter.salary.length){
      filterJob = filterJob.filter((jobs:any) => filter.salary[0] <= jobs.packageOffered && jobs.packageOffered <= filter.salary[1]);
    }

    setFilteredJobs(filterJob);

  }, [filter, jobList]);

  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <div className='text-2xl font-semibold'>Recommended Jobs</div>
        <Sort sort="job" />
      </div>
      <div className='flex flex-wrap gap-10 mt-10'>
        {filteredJobs.map((job:any, index:any) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;