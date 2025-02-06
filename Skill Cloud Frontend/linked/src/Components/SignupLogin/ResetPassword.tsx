import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  TextInput,
} from '@mantine/core';
import { IconLock, IconMail } from '@tabler/icons-react';
import { useState } from 'react';
import { sendOtp, verifyOtp, changePass } from '../../Services/UserService'; // Assume changePass API exists
import {
  errorNotification,
  successNotification,
} from '../../Services/NotificationService';
import { useInterval } from '@mantine/hooks';

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [passErr, setPassErr] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1);
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    setError('');
    sendOtp(email)
      .then((res) => {
        console.log(res);
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to send OTP. Please try again.');
        setOtpSending(false);
      });
  };

  const handleVerifyOtp = (enteredOtp: string) => {
    setOtp(enteredOtp);
    verifyOtp(email, enteredOtp)
      .then((res) => {
        console.log(res);
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        setError('OTP verification failed. Please try again.');
      });
  };

  const handlechangePass = () => {
    if (passErr) return; // Ensure no password validation errors
    setPasswordChanging(true);
    changePass(email, password) // Assume API exists
      .then((res) => {
        console.log(res);
        successNotification(
          'Password changed successfully!',
          'Login with new password.'
        );
        props.close(); // Close modal on success
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          'Failed to change password. Please try again.',
          err.response.data.errorMessage
        );
      })
      .finally(() => setPasswordChanging(false));
  };

  const resendOtp = () => {
    if(resendLoader) return;
    handleSendOtp();
  };

  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
    setEmail('');
    setError('');
  };

  const signupValidation = (field: string, value: string): string => {
    if (field === 'password') {
      if (value.length < 8) {
        return 'Password must be at least 8 characters long.';
      }
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least one uppercase letter.';
      }
      if (!/[a-z]/.test(value)) {
        return 'Password must contain at least one lowercase letter.';
      }
      if (!/[0-9]/.test(value)) {
        return 'Password must contain at least one number.';
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return 'Password must contain at least one special character.';
      }
    }
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const validationError = signupValidation('password', value);
    setPassErr(validationError);
  };

  return (
    <Modal opened={props.opened} onClose={props.close} title='Reset Password'>
      <div className='flex flex-col gap-6'>
        <TextInput
          value={email}
          name='email'
          size='md'
          onChange={(e) => setEmail(e.target.value)}
          leftSection={<IconMail size={16} />}
          withAsterisk
          label='Email'
          placeholder='Your Email'
          rightSection={
            <Button
              size='xs'
              className='mr-1'
              loading={otpSending && !otpSent}
              onClick={handleSendOtp}
              disabled={email === '' || otpSent}
              variant='filled'
            >
              Send OTP
            </Button>
          }
          rightSectionWidth='xl'
        />
        {error && (
          <span style={{ color: 'red', fontSize: '0.875rem' }}>{error}</span>
        )}
        {otpSent && (
          <PinInput
            className='mx-auto'
            length={6}
            type='number'
            size='md'
            gap='lg'
            onComplete={(value) => handleVerifyOtp(value)}
          />
        )}
        {otpSent && !verified && (
          <div className='flex gap-2'>
            <Button
              fullWidth
              loading={otpSending}
              onClick={resendOtp}
              variant='light'
            >
              {resendLoader?"Resend in " + seconds + "s":"Resend OTP"}
            </Button>
            <Button fullWidth onClick={changeEmail} variant='filled'>
              Change Email
            </Button>
          </div>
        )}
        {verified && (
          <>
            <PasswordInput
              value={password}
              error={passErr}
              name='password'
              onChange={handlePasswordChange}
              leftSection={<IconLock size={16} />}
              label='Password'
              withAsterisk
              placeholder='New Password'
            />
            <Button
              fullWidth
              disabled={!!passErr || password === ''}
              loading={passwordChanging}
              onClick={handlechangePass}
              variant='filled'
            >
              Change Password
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
