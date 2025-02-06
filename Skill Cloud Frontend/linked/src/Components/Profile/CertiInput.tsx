import { TextInput, Button } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";
import { fields } from "../../Data/PostJob";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import SelectInput from "./SelectInput";

const CertiInput = (props: any) => {
  const profile = useSelector((state: any) => state.profile);
  const select = fields;
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      title: '',
      issuer: '',
      issueDate: new Date(),
      certificateId: '',
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      issuer: (value) => (!value ? 'Issuer is required' : null),
      issueDate: (value) => (!value ? 'Issue Date is required' : null),
      certificateId: (value) => (!value ? 'Certificate ID is required' : null),
    },
  });

  const handleSave = () => form.onSubmit((values) => {
    console.log("Saving certificate with values:", values);
    let certi = [...profile.certifications];
    certi.push({ ...values, issueDate: values.issueDate.toISOString() });
    let updatedProfile = { ...profile, certifications: certi };
    console.log("Updated profile:", updatedProfile);
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certificate added successfully");
    props.setEdit(false);
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput {...form.getInputProps("title")} withAsterisk label="Title" placeholder="Enter Title" />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          withAsterisk
          maxDate={new Date()}
          label="Issue Date"
          placeholder="Pick date"
        />
        <TextInput {...form.getInputProps("certificateId")} withAsterisk label="Certificate ID" placeholder="Enter ID" />
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
          Save
        </Button>
        <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;