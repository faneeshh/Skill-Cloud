import { Indicator, Menu, Notification, rem } from '@mantine/core';
import { IconBell, IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNotifications, readNotification } from '../../Services/NotiService';
import { useNavigate } from 'react-router-dom';

const NotificationMenu = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [notifications, setNotifications] = useState<any>([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    getNotifications(user.id)
      .then((res) => {
        setNotifications(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const unread = (index: number) => {
    let notis = [...notifications];
    notis = notis.filter((_noti: any, i: number) => i !== index);
    setNotifications(notis);
    readNotification(notifications[index].id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Menu shadow='md' width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <Indicator
            disabled={notifications.length <= 0}
            color='red'
            offset={6}
            size={8}
            processing
          >
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className='flex flex-col gap-1'>
          {notifications.map((noti: any, index: number) => (
            <Notification
              onClose={() => unread(index)}
              key={index}
              onClick={() => {
                navigate(noti.route);
                unread(index);
                setOpened(false);
                
              }}
              className='hover:bg-mine-shaft-900 cursor-pointer'
              icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
              color='teal'
              title={noti.action}
              mt={'md'}
            >
              {noti.message}
            </Notification>
          ))}
          {notifications.length === 0 ? (
            <div className='text-center text-gray-400'>No notifications</div>
          ) : (
            <></>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;
