import { toast } from 'react-toastify';

const notifySuccess = message => {
    toast.success(message);
}

const notifyError = message => {
    toast.error(message)
}

export { notifySuccess, notifyError };