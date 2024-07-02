import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { passwordValidate } from "../helper/validate";
import style from "../styles/Username.module.css";




export const Password = () => {

  const formik = useFormik({
    initialValues: {
      password: "asion@274",
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
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={style.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps("password")} type="text" className={style.textbox} placeholder="Password" />
              <button className={style.btn} type="submit">Sign In</button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link className="text-red-500" to="/recovery">
                   Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};
