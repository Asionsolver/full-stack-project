import { useFormik } from "formik";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import convertToBase64 from "../helper/convert";
import { registerValidation } from "../helper/validate";
import style from "../styles/Username.module.css";

export const Register = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "example@gmail.com",
      username: "example123",
      password: "asion@274",
    },
    validate: registerValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || ""});
      console.log(values);
    },
  });

  // formik does not support file input, so we need to handle it manually
  const onUpload = async (e) => {
    const base64 = await convertToBase64( e.target.files[0]);
    setFile(base64);
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div
          className={style.glass}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={style.profile_img}
                  alt="avatar"
                />
              </label>

              <input onChange={onUpload} type="file" id="profile" name="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                type="text"
                className={style.textbox}
                placeholder="Password"
              />
              <input
                {...formik.getFieldProps("email")}
                type="text"
                className={style.textbox}
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("password")}
                type="text"
                className={style.textbox}
                placeholder="Password"
              />
              <button className={style.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{" "}
                <Link className="text-red-500" to="/">
                  Log Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
