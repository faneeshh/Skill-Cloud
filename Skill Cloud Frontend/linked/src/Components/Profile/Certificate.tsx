import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useSelector } from "react-redux";

const Certificate = () => {
    const [edit, setEdit] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const profile = useSelector((state: any) => state.profile);

    const handleEdit = () => {
        setEdit(!edit);
    }

    return <div className='px-3'>
    <div className='flex justify-between mb-5 text-2xl font-semibold'>
      Certifications
      <div className='flex gap-2'>
        <ActionIcon
          onClick={() => setAddCerti(true)}
          size='lg'
          color='kashmir-blue.4'
          variant='subtle'
        >
          <IconPlus className='h-4/5 w-4/5' />
        </ActionIcon>
        <ActionIcon
          onClick={handleEdit}
          size='lg'
          color={edit?"red.8":"kashmir-blue.4"}
          variant='subtle'
        >
          {edit ? (
            <IconX className='h-4/5 w-4/5' />
          ) : (
            <IconPencil className='h-4/5 w-4/5' />
          )}
        </ActionIcon>{' '}
      </div>
    </div>
    <div className='flex flex-col gap-8'>
      {profile?.certifications?.map((certi: any, index: number) => (
        <CertiCard index={index} key={index} edit={edit} {...certi} />
      ))}
      {addCerti && <CertiInput setEdit={setAddCerti} />}
    </div>
  </div>
}

export default Certificate;