import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { resetPasswordValidation } from "../helper/validate";
import style from "../styles/Username.module.css";

export const Recovery = () => {
  const formik = useFormik({
    initialValues: {
      password: "asion@274",
    },
    validate: resetPasswordValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={style.glass} style={{width: "50%"}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OPT to recover password.
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  className={style.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>
              <button className={style.btn} type="submit">
                Recover
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP? <button className="text-red-500">Resend</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
