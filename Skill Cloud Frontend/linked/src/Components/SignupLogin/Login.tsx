import {
  TextInput,
  PasswordInput,
  rem,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { IconCheck, IconLock, IconMail, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/UserService';
import { loginValidation } from '../../Services/FormValidation';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import ResetPassword from './ResetPassword';
import { useDispatch } from 'react-redux';
import {
  errorNotification,
  successNotification,
} from '../../Services/NotificationService';
import { setUser } from '../../Slices/UserSlice';

const form = {
  email: '',
  password: '',
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: '' });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      const error = loginValidation(key, data[key]);
      newFormError[key] = error;

      if (error) valid = false;
    }

    setFormError(newFormError);
    if (valid) {
      loginUser(data)
        .then((res) => {
          console.log(res);
          successNotification(
            'Login Success',
            'You have successfully logged in'
          );
          setTimeout(() => {
            setLoading(false);
            dispatch(setUser(res));
            navigate('/');
          }, 4000);
        })
        .catch(() => {
          setLoading(false);
          errorNotification('Login Failed', 'Please check your credentials');
        });
    }
  };

  return (
    <>
      {' '}
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'kashmir-blue.4', type:'dots' }}
      />
      <div className='flex flex-col justify-center w-1/2 gap-3 px-20'>
        <div className='text-2xl font-semibold'>Login Account</div>
        <TextInput
          value={data.email}
          error={formError.email}
          leftSection={<IconMail size={16} />}
          name='email'
          onChange={handleChange}
          withAsterisk
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
            <IconLock
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          label='Password'
          placeholder='Password'
        />
        <Button
          loading={loading}
          onClick={handleSubmit}
          autoContrast
          variant='filled'
        >
          Login
        </Button>
        <div className='mx-auto'>
          Don't have an Account?{' '}
          <span
            onClick={() => {
              navigate('/signup');
              setFormError(form), setData(form);
            }}
            className='text-kashmir-blue-400 hover:underline cursor-pointer'
          >
            Signup
          </span>{' '}
        </div>
        <div
          onClick={open}
          className='text-kashmir-blue-300 hover:underline text-center cursor-pointer'
        >
          Forget Password?
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;
