import {
    notification
} from 'antd';

export const openSuccessNotification = (message: string) => {
    notification['success']({
        message,
    });
};