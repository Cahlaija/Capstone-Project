import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function Register() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      await API.post("/auth/register", form);


      alert("Registration successful!");


      navigate("/login");


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };


  return (
    <div>

      <h2>Register</h2>


      <form onSubmit={handleSubmit}>


        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />


        <button type="submit">
          Register
        </button>


      </form>


    </div>
  );
}


export default Register;