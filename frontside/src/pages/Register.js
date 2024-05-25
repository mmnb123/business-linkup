import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import "../styles/Register.css";

const Register = () => {
  const initialState = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male'
  };

  const [showpass, setShowpass] = useState(false);
  const [showcfpass, setShowcfpass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const { username, fullname, email, password, confirmPassword, gender } = userData;

  const { auth, alert } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (auth.token) {
      history.push('/');
    }
  }, [auth.token, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="register">
      <div className="register-container">
        <h3 className="register-header">Business Linkup</h3>
        <h6 className="register-subheader">Register</h6>
        <form className="register-dataform" onSubmit={handleSubmit}>
          <input
            className="register-dataforminput"
            type="text"
            value={fullname}
            name="fullname"
            onChange={handleChange}
            placeholder={alert.fullname ? alert.fullname : 'Enter your fullname'}
            style={{ backgroundColor: alert.fullname ? '#fa8e96' : '' }}
          />
          <input
            className="register-dataforminput"
            type="text"
            name="username"
            placeholder={alert.username ? alert.username : 'Enter your username'}
            value={username.toLowerCase().replace(/ /g, '')}
            onChange={handleChange}
            style={{ backgroundColor: alert.username ? '#fa8e96' : '' }}
          />
          <input
            className="register-dataforminput"
            type="email"
            placeholder={alert.email ? alert.email : 'Enter your Email'}
            style={{ backgroundColor: alert.email ? '#fa8e96' : '' }}
            value={email}
            name="email"
            onChange={handleChange}
          />
          <div className="register-password-container">
  <input
    className="register-dataforminput"
    type={showpass ? "text" : "password"}
    placeholder={alert.password ? alert.password : 'Enter your Password'}
    style={{ backgroundColor: alert.password ? '#fa8e96' : '' }}
    value={password}
    name="password"
    onChange={handleChange}
  />
  <small className="register-showpass" onClick={() => setShowpass(!showpass)}> {showpass ? "Hide" : "Show"} </small>
</div>
<div className="register-password-container1">
          <input
            className="register-dataforminput"
            type={showcfpass ? "text" : "password"}
            placeholder={alert.confirmPassword ? alert.confirmPassword : 'Enter your password again'}
            style={{ backgroundColor: alert.confirmPassword ? '#fa8e96' : '' }}
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          <small className="register-showcfpass" onClick={() => setShowcfpass(!showcfpass)}> {showcfpass ? "Hide" : "Show"} </small>
          </div>
          <select className="register-dataformselect" name="gender" value={gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button className="register-dataformbtn" type="submit">Sign Up</button>
          <p className="register-small">Already have an account? <Link to="/">Log In here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
