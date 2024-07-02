import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { passwordValidate } from "../helper/validate";
import style from "../styles/Username.module.css";




export const Reset = () => {

  const formik = useFormik({
    initialValues: {
      password: "asion@274",
      confirm_password: "asion@274",
    },
    validate: passwordValidate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new passwords.
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps("password")} type="text" className={style.textbox} placeholder="Password" />
              <input {...formik.getFieldProps("confirm_password")} type="text" className={style.textbox} placeholder="Confirm Password" />
              <button className={style.btn} type="submit">Reset</button>
            </div>

            
          </form>
        </div>
      </div>
      
    </div>
  );
};
