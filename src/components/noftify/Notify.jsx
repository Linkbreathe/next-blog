import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const notifySuccess = (message) => toast.success(message, {
    icon: '👏'
});
const notifyError = (message) => toast.error(message, {
    icon: '⚠️'
});


const Notify = () => {

    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },

                // Default options for specific types
                success: {
                    duration: 3000,
                    style: {
                        background: '#2c4f46',
                        color: '#fff',
                    },
                },

                error: {
                    duration: 3000,
                    style: {
                        background: '#5c2d33',
                        color: '#fff',
                    },
                },
            }}
        />
    )
}

export { notifySuccess, notifyError };
export default Notify;