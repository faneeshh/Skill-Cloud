import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../Components/ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const ApplyJobPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id).then((res) => {
      setJob(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Button
          onClick={() => navigate(-1)}
          className='my-4 inline-block'
          leftSection={<IconArrowLeft size={20} />}
          color='kashmir-blue.4'
          variant='light'
        >
          Back
        </Button>
      <ApplyJobComp {...job} />
    </div>
  );
};

export default ApplyJobPage;
