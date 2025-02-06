import { ActionIcon } from "@mantine/core";
import { IconPlus, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";

const Experience = () => {
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };
  

  if (!profile) return <div>Loading...</div>;

  return (
    <div className='px-3'>
      <div className='flex justify-between mb-5 text-2xl font-semibold'>
        Experience{' '}
        <div>
          <ActionIcon
            onClick={() => setAddExp(true)}
            size='lg'
            color='kashmir-blue.4'
            variant='subtle'
          >
            <IconPlus />
          </ActionIcon>{' '}
          <ActionIcon
            onClick={handleEdit}
            size='lg'
            color={edit ? "red.8" : "kashmir-blue.4"}
            variant='subtle'
          >
            {edit ? <IconX /> : <IconPencil />}
          </ActionIcon>
        </div>
      </div>
      <div className='flex flex-col gap-8'>
        {profile?.experiences?.length > 0 ? (
          profile?.experiences?.map((exp: any, index: number) => (
            <ExpCard key={index} index={index} {...exp} edit={edit} />
          ))
        ) : (
          <div>No experiences added yet.</div>
        )}
        {addExp && <ExpInput add setEdit={setAddExp} />}
      </div>
    </div>
  );
};
// Here we ar3e exporiuntyg thsi experience 
export default Experience;
