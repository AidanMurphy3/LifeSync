import InputField from "@components/InputFields/InputField";
import Buttons from "@components/Buttons/Buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Authen() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be atleast 6 charaters")
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://lifesync-ufkl.onrender.com/api/users/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();
        console.log("Login response:", data);

        if (!response.ok) {
          alert(data.message || "Login failed");
          return;
        }

        // store token
        localStorage.setItem("token", data.token);

        // redirect to homepage
        window.location.href = "/";
      } catch (error) {
        console.error(error);
        alert("Network error");
      }
    },
  });

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  console.log(formik.errors);

  return (
    <div className="ls-container">
      <p className="text-center text-xs">{isLogin ? "Login" : "Sign Up"}</p>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          id="username"
          label="Username *"
          type="text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && formik.touched.username && (
          <div className="text-[var(--ls-accent-red)]">
            {formik.errors.username}
          </div>
        )}
        <InputField
          id="email"
          label="Email *"
          type="Email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-[var(--ls-accent-red)]">
            {formik.errors.email}
          </div>
        )}
        <InputField
          id="password"
          label="Password *"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <div className="text-[var(--ls-accent-red)]">
            {formik.errors.password}
          </div>
        )}

        <div className="flex justify-between">
          {isLogin ? (
            <div>
              Dont have an Account?{" "}
              <span
                className="text-[var(--ls-primary)] cursor-pointer underline ml-1"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </div>
          ) : (
            <div>
              already have an Account?{" "}
              <span
                className="text-[var(--ls-primary)] cursor-pointer underline ml-1"
                onClick={() => setIsLogin(true)}
              >
                Sign Up
              </span>
            </div>
          )}

          <div>
            <Buttons text={isLogin ? "Login" : "Sign Up"} type="submit" />
            <Buttons
              text="Back"
              onClick={() => navigate(-1)}
              variant="return"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Authen;
