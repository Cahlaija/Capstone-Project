import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const [form, setForm] = useState({
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

      const response = await API.post(
        "/auth/login",
        form
      );


      login(
        response.data.token,
        response.data.user
      );


      navigate("/products");


    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };



  return (

    <div>

      <h2>Login</h2>


      <form onSubmit={handleSubmit}>


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
          Login
        </button>


      </form>


    </div>

  );

}


export default Login;