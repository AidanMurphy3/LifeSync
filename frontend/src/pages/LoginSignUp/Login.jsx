import InputField from "@components/InputFields/InputField";
import Buttons from "@components/Buttons/Buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Authen() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: isLogin ? Yup.string() : Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const url = isLogin
          ? "https://lifesync-ufkl.onrender.com/api/auth/login"
          : "https://lifesync-ufkl.onrender.com/api/auth/register";

        const payload = isLogin
          ? { email: values.email, password: values.password }
          : { name: values.name, email: values.email, password: values.password };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // Safely parse JSON
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Server returned non-JSON response:", text);
          alert("Unexpected server response. Check backend URL.");
          return;
        }

        // Store token if backend returns one
        if (data.token) localStorage.setItem("token", data.token);

        if (!response.ok) {
          alert(data.message || "Request failed");
          return;
        }

        if (data.token) localStorage.setItem("authToken", data.token);
        if (data.data) localStorage.setItem("user", JSON.stringify(data.data));

        navigate("/"); // redirect to homepage
      } catch (err) {
        console.error(err);
        alert("Network error");
      }
    },
  });

  // Clear form when toggling between login/signup
  useEffect(() => {
    formik.resetForm();
  }, [isLogin]);

  return (
    <div className="ls-container">
      <p className="text-center text-xs">{isLogin ? "Login" : "Sign Up"}</p>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <InputField
              id="name"
              label="Name *"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-[var(--ls-accent-red)]">{formik.errors.name}</div>
            )}
          </>
        )}

        <InputField
          id="email"
          label="Email *"
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-[var(--ls-accent-red)]">{formik.errors.email}</div>
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
          <div className="text-[var(--ls-accent-red)]">{formik.errors.password}</div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div>
            {isLogin ? (
              <>
                Don’t have an Account?{" "}
                <span
                  className="text-[var(--ls-primary)] cursor-pointer underline ml-1"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an Account?{" "}
                <span
                  className="text-[var(--ls-primary)] cursor-pointer underline ml-1"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <Buttons text={isLogin ? "Login" : "Sign Up"} type="submit" />
            <Buttons text="Back" onClick={() => navigate(-1)} variant="return" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Authen;
