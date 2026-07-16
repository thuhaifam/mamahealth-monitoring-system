import { useState } from "react";
import "../../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { isBlank, isEmail } from "../../utils/validation";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHeartbeat,
} from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();

  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    // Validation rules:
    // - Email: required and must be a valid email address
    // - Password: required

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

    try {

        setLoading(true);

        const response = await authService.login(formData);

        const { token, role } = response.data;

        auth.login(token, role);

        toast.success(response.message);

        switch (role) {

            case "MOTHER":
                navigate("/mother/dashboard");
                break;

            case "DOCTOR":
                navigate("/doctor/dashboard");
                break;

            case "ADMIN":
                navigate("/admin/dashboard");
                break;

            default:
                navigate("/");
        }

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Login failed."
        );

    } finally {

        setLoading(false);

    }

};

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg,#0d6efd,#20c997)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "430px",
          borderRadius: "25px",
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div
              className="rounded-circle bg-primary d-flex justify-content-center align-items-center mx-auto"
              style={{
                width: "85px",
                height: "85px",
              }}
            >
              <FaHeartbeat size={40} color="white" />
            </div>

            <h2 className="fw-bold mt-4">MamaHealth</h2>

            <p className="text-muted">
              Welcome Back
              <br />
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fw-semibold mb-2">Email</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="fw-semibold mb-2">Password</label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                />

                <label
                  className="form-check-label"
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>

              <a
                href="#"
                className="text-decoration-none"
              >
                Forgot Password?
              </a>
            </div>

            <button
              className="btn btn-primary w-100 py-3 fw-bold"
              disabled={loading}
              style={{
                borderRadius: "12px",
                fontSize: "17px",
              }}
            >
              {loading ? "Signing In..." : "LOGIN"}
            </button>
          </form>

          <hr className="my-4" />
          <p className="text-center mb-0">
    Don't have an account?

    <Link
        to="/signup"
        className="ms-2 text-decoration-none fw-bold"
    >
        Register
    </Link>
    </p>
          <p className="text-center text-muted mb-0">
            🩺 Secure • Fast • Reliable Healthcare
          </p>
        </div>
      </div>
    </div>
  );
}
