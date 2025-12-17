import notifee, { AndroidImportance } from '@notifee/react-native';

export const showAlertNotification = async (
  title: string,
  body: string,
  isDanger = false,
) => {
  const channelId = await notifee.createChannel({
    id: 'alert',
    name: 'Driver Alert',
    importance: AndroidImportance.HIGH,
    sound: 'beeps_mid_pitch',
  });

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      pressAction: {
        id: isDanger ? 'CONFIRM_SAFE' : 'default',
      },
      ongoing: isDanger,
      autoCancel: !isDanger,
    },
  });
};
