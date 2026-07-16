import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaHeartbeat,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { isBlank, isEmail, isStrongPassword } from "../../utils/validation";
import "../../assets/css/login.css";

export default function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Exact validation rules:
    // - Email: required and must be a valid email address (e.g. user@example.com)
    // - Password: required, at least 8 characters, must include letters and numbers
    // - Confirm Password: required and must match Password

    if (isBlank(formData.email)) {
      toast.warning("Email is required.");
      return;
    }

    if (!isEmail(formData.email)) {
      toast.warning("Email must be a valid email address (e.g. user@example.com).");
      return;
    }

    if (isBlank(formData.password)) {
      toast.warning("Password is required.");
      return;
    }

    if (!isStrongPassword(formData.password)) {
      toast.warning("Password must be at least 8 characters and include letters and numbers.");
      return;
    }

    if (isBlank(formData.confirmPassword)) {
      toast.warning("Confirm Password is required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      await authService.signup({

        email: formData.email,

        password: formData.password

      });

toast.success("Account created successfully.");
      navigate("/");

    } catch (error) {

toast.error(
    error.response?.data?.message || "Signup failed."
);
    } finally {

      setLoading(false);

    }

  };

  return (

<div
className="d-flex justify-content-center align-items-center vh-100"
style={{
background:"linear-gradient(135deg,#0d6efd,#20c997)"
}}
>

<div
className="card shadow-lg border-0"
style={{
width:"450px",
borderRadius:"25px"
}}
>

<div className="card-body p-5">

<div className="text-center mb-4">

<div
className="rounded-circle bg-primary d-flex justify-content-center align-items-center mx-auto"
style={{
width:"85px",
height:"85px"
}}
>

<FaHeartbeat
size={40}
color="white"
/>

</div>

<h2 className="fw-bold mt-4">

Create Account

</h2>

<p className="text-muted">

Join MamaHealth

</p>

</div>

<form onSubmit={handleSubmit}>

<div className="mb-3">

<label>Email</label>

<div className="input-group">

<span className="input-group-text">

<FaEnvelope/>

</span>

<input

type="email"

name="email"

className="form-control"

placeholder="Enter email"

value={formData.email}

onChange={handleChange}

required

/>

</div>

</div>

<div className="mb-3">

<label>Password</label>

<div className="input-group">

<span className="input-group-text">

<FaLock/>

</span>

<input

type={showPassword ? "text" : "password"}
name="password"

className="form-control"

placeholder="Enter password"

value={formData.password}

onChange={handleChange}

required

/>

<button

type="button"

className="btn btn-outline-secondary"

onClick={()=>setShowPassword(!showPassword)}

>

{showPassword?<FaEyeSlash/>:<FaEye/>}

</button>

</div>

</div>

<div className="mb-4">

    <label className="mb-3">
        Confirm Password
    </label>

    <div className="input-group">

        <span className="input-group-text">
            <FaLock />
        </span>

        <input
type={showConfirmPassword ? "text" : "password"}            name="confirmPassword"
            className="form-control"
            placeholder=" Enter confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
        />

        <button
    type="button"
    className="btn btn-outline-secondary"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
>
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
</button>

    </div>

</div>

<button

className="btn btn-primary w-100 py-3 fw-bold"

disabled={loading}

>

{loading?"Creating Account...":"REGISTER"}

</button>

</form>

<hr/>

<p className="text-center mb-0">

Already have an account?

<Link
to="/"
className="ms-2"
>

Login

</Link>

</p>

</div>

</div>

</div>

  );

}