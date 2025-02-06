import {
  TextInput,
  NumberInput,
  FileInput,
  Textarea,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPaperclip } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBase64 } from '../../Services/Utilities';
import { applyJob } from '../../Services/JobService';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { useSelector } from 'react-redux';

const ApplicationForm = () => {
  const {id} = useParams();
  const user = useSelector((state:any) => state.user);
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const handlePreview = () => {
    form.validate();
    if(!form.isValid) return;
    setPreview(!preview);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setSubmit(true);
    let resume:any = await getBase64(form.getValues().resume);
    let applicant = {...form.getValues(),applicantId:user.id, resume:resume.split(',')[1]};
    applyJob(id, applicant).then((res) => {
      setSubmit(false);
      successNotification('Success','Application submitted successfully');
      navigate('/job-history');
    }).catch((err) => {
      setSubmit(false);
      errorNotification('Error',"Job Applied already");
    })
  }

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      website: '',
      resume: null,
      coverLetter: '',
    },
    validate: {
      name: (value) => {
        if (value.length < 3) {
          return 'Name should be atleast 3 characters long';
        }
      },
      email: (value) => {
        if (!value.includes('@')) {
          return 'Invalid email';
        }
      },
      phone: (value) => {
        if (value.length < 10) {
          return 'Invalid phone number';
        }
      },
      resume: (value) => {
        if (!value) {
          return 'Resume is required';
        }
      },
      coverLetter: (value) => {
        if (value.length < 10) {
          return 'Cover letter should be atleast 10 characters long';
        }
      },
    },
  });

  return (
    <div>
      <LoadingOverlay
        className='!fixed'
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'kashmir-blue.4', type: 'bars' }}
      ></LoadingOverlay>
      <div className='mb-5 text-xl font-semibold'>Submit Your Application</div>
      <div className='flex flex-col gap-5'>
        <div className='flex gap-10 [&>*]:w-1/2'>
          <TextInput
            {...form.getInputProps('name')}
            readOnly={preview}
            variant={preview ? 'unstyled' : 'default'}
            className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
            label='Full Name'
            withAsterisk
            placeholder='Enter Name'
          />
          <TextInput
            {...form.getInputProps('email')}
            readOnly={preview}
            variant={preview ? 'unstyled' : 'default'}
            className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
            label='Email'
            withAsterisk
            placeholder='Enter email'
          />
        </div>
        <div className='flex gap-10 [&>*]:w-1/2'>
          <NumberInput
            {...form.getInputProps('phone')}
            readOnly={preview}
            variant={preview ? 'unstyled' : 'default'}
            className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
            hideControls
            min={0}
            max={9999999999}
            clampBehavior='strict'
            label='Phone Number'
            withAsterisk
            placeholder='Enter Number'
          />
          <TextInput
            {...form.getInputProps('website')}
            readOnly={preview}
            variant={preview ? 'unstyled' : 'default'}
            className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
            label='Personal Website'
            placeholder='Enter URL'
          />
        </div>
        <FileInput
          {...form.getInputProps('resume')}
          accept='application/pdf'
          readOnly={preview}
          variant={preview ? 'unstyled' : 'default'}
          className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
          withAsterisk
          leftSection={<IconPaperclip stroke={1.5} />}
          label='Upload your Resume'
          placeholder='Your Resume'
          leftSectionPointerEvents='none'
        />

        <Textarea
          {...form.getInputProps('coverLetter')}
          readOnly={preview}
          variant={preview ? 'unstyled' : 'default'}
          className={`${preview ? 'text-mine-shaft-300 font-semibold' : ''}`}
          withAsterisk
          placeholder='Tell something about yourself...'
          label='Cover letter'
          autosize
          minRows={4}
        />
        {!preview && (
          <Button
            onClick={handlePreview}
            color='kashmir-blue.4'
            variant='light'
          >
            Preview
          </Button>
        )}
        {preview && (
          <div className='flex gap-10 [&>*]:w-1/2'>
            <Button
              fullWidth
              onClick={handlePreview}
              color='kashmir-blue.4'
              variant='outline'
            >
              Edit
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              color='kashmir-blue.4'
              variant='light'
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
