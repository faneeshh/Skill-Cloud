import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Skills = () => {
    const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [skills, setSkills] = useState<string[]>([]);

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills);
    } else setEdit(false);
  };

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, skills:skills };
    dispatch(changeProfile(updatedProfile));
    successNotification('Success', 'Skills updated successfully');
  }
    return <div className='px-3'>
    <div className='flex justify-between mb-3 text-2xl font-semibold'>
      Skills
      <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              size='lg'
              color='green.8'
              variant='subtle'
            >
              <IconCheck className='h-4/5 w-4/5' stroke={1.5} />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleEdit}
            size='lg'
            color={edit ?'red.8':'kashmir-blue.4'}
            variant='subtle'
          >
            {edit ? <IconX /> : <IconPencil />}
          </ActionIcon>
        </div>
    </div>
    {edit ? (
      <TagsInput
        value={skills}
        onChange={setSkills}
        placeholder='Add Skill'
        splitChars={[',', ' ', '|']}
      />
    ) : (
      <div className='flex flex-wrap gap-2'>
        {profile?.skills?.map((skill:any, index:number) => (
          <div
            key={index}
            className='bg-kashmir-blue-300 bg-opacity-15 rounded-3xl text-kashmir-blue-400 px-3 py-1 text-sm font-medium'
          >
            {skill}
          </div>
        ))}
      </div>
    )}
  </div>
}

export default Skills;