import React, { useState, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    const userData = { username, password };
    console.log("userData =>", userData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        userData
      );
      console.log("✅ Login Successful:", response.data);

      const { access, refresh } = response.data;

      // Save tokens
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Optionally set default Authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      setIsAuthenticated(true);
      setSuccess(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Invalid Credentials:", error.response?.data || error);
      const msg =
        error.response?.data?.detail || "Invalid username or password";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-dark text-light p-5 rounded shadow-lg">
          <h3 className="text-center mb-4">Login to Our Portal</h3>

          <form onSubmit={handleLogin}>
            {/* Username */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error / Success Messages */}
            {errors.general && (
              <div className="alert alert-danger text-center">
                {errors.general}
              </div>
            )}
            {success && (
              <div className="alert alert-success text-center">
                Login Successful!
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-info d-block mx-auto w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
