import {toast, ToastContainer} from "react-toastify";
import {injectStyle} from "react-toastify/dist/inject-style";

type Props = {
    isError?: boolean;
    error?: any
};
if (typeof window !== "undefined") {
    injectStyle();
}

export function ErrorComponent({isError, error}: Props) {
    if (isError) {
        toast.error(error.error)
        return (
            <>
                {/*{error.error}*/}
                <ToastContainer position="bottom-left"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"/>
            </>
        )
    } else {
        return (
            <>
                <ToastContainer position="bottom-left"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"/>
            </>
        )
    }
}
