import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const { dispatch } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault();
    const body ={
      username,
      password
    }
    axios.post(register ? '/register' : '/login',body)
         .then((res)=>{
          dispatch({type:'LOGIN',payload:res.data})
         })
         .catch((err)=>{
          if (err.response.data) {
            setErrorMessage(err.response.data); 
          }
          console.log(err)
         })
    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input className="form-input" />
        <input className="form-input" />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
      {errorMessage && (
        <div className="error-notification">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>Close</button>
        </div>
      )}
    </main>
  );
};

export default Auth;
