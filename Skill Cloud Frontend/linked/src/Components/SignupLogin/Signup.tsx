import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Radio,
  rem,
  TextInput,
} from '@mantine/core';
import { IconAt, IconCheck, IconLock, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Services/UserService';
import { signupValidation } from '../../Services/FormValidation';
import { notifications } from '@mantine/notifications';
import { errorNotification, successNotification } from '../../Services/NotificationService';

const form = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  accountType: 'APPLICANT',
};

const Signup = () => {
  const [value, setValue] = useState('react');

  const [data, setData] = useState<{[key:string]:string}>(form);
  const [formError, setFormError] = useState<{[key:string]:string}>(form);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    if (typeof event === 'string') {
      setData({ ...data, accountType: event });
      return;
    }
  
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });
    if(name === "password" && data.confirmPassword !== "") {
      let err = "";
      if(data.confirmPassword !== value) {
        err = "Passwords do not match"
      }
       setFormError({ ...formError, [name]: signupValidation(name, value), confirmPassword:err});
    }

    if(name === "confirmPassword"){
      if(data.password !== value) setFormError({...formError, [name]:"Passwords do not match"});
      else setFormError({...formError, confirmPassword:""})
    } 
  };
  

  const handleSubmit = () => {
    let valid = true;
    let newFormError: { [key: string]: string } = {};
  
    for (let key in data) {
      if (key === "accountType") continue;
  
      const error = signupValidation(key, data[key]);
      newFormError[key] = error;
  
      if (error) valid = false;
    }
  
    if (data.password !== data.confirmPassword) {
      newFormError.confirmPassword = "Passwords do not match";
      valid = false;
    }
  
    setFormError(newFormError);
  
    if (valid) {
      setLoading(true);
      registerUser(data)
        .then(() => {
          setData(form);
          successNotification("Registration Success", "You have successfully registered");
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          },4000)
        })
        .catch(() => {
          setLoading(false);
          errorNotification("Registration Failed", "Please check your credentials");
        });
    }
  };
  

  return ( <>  <LoadingOverlay
          visible={loading}
          zIndex={1000}
          className='translate-x-1/2'
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'kashmir-blue.4', type:'dots' }}
        />
    <div className='w-1/2 px-20 flex flex-col justify-center gap-3'>
      <div className='text-2xl font-semibold'>Create Account</div>
      <TextInput
        value={data.name}
        error={formError.name}
        name='name'
        onChange={handleChange}
        withAsterisk
        label='Full Name'
        placeholder='Your Name'
      />
      <TextInput
        value={data.email}
        error={formError.email}
        name='email'
        onChange={handleChange}
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label='Email'
        placeholder='Your Email'
      />
      <PasswordInput
        value={data.password}
        error={formError.password}
        name='password'
        onChange={handleChange}
        withAsterisk
        leftSection={
          <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        label='Password'
        placeholder='Password'
      />
      <PasswordInput
        value={data.confirmPassword}
        error={formError.confirmPassword}
        name='confirmPassword'
        onChange={handleChange}
        withAsterisk
        leftSection={
          <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        label='Confirm Password'
        placeholder='Confirm Password'
      />

      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        label='Account Type?'
        withAsterisk
      >
        <Group mt={'xs'}>
          <Radio
            className='py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-kashmir-blue-400/5 has-[:checked]:border-kashmir-blue-400 border-mine-shaft-800 rounded-lg'
            autoContrast
            value='APPLICANT'
            label='Applicant'
          />
          <Radio
            className='py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-kashmir-blue-400/5 has-[:checked]:border-kashmir-blue-400 border-mine-shaft-800 rounded-lg'
            autoContrast
            value='EMPLOYER'
            label='Employer'
          />
        </Group>
      </Radio.Group>

      <Checkbox
        autoContrast
        label={
          <>
            I accept <Anchor>terms & conditions</Anchor>
          </>
        }
      />
      <Button loading={loading} onClick={handleSubmit} autoContrast variant='filled'>
        Sign up
      </Button>
      <div className='mx-auto'>
        Have an Account already?{' '}
        <span onClick={() => {navigate("/login"); setFormError(form); setData(form)}} className='text-kashmir-blue-400 hover:underline cursor-pointer'>
          Login
        </span>{' '}
      </div>
    </div></>
  );
};

export default Signup;
