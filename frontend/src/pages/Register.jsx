import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", formData);

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Create Account
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#666",
        }}
      >
        Register to start managing your inventory.
      </p>


      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}


      {success && (
        <p
          style={{
            color: "green",
            textAlign: "center",
          }}
        >
          {success}
        </p>
      )}


      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter username"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>


        <div style={{ marginBottom: "20px" }}>
          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create password"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

      </form>


      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Already have an account?{" "}
        <Link to="/login">
          Login here
        </Link>
      </p>

    </div>
  );
}

export default Register;