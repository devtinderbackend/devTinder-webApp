import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("harry@gmail.com");
  const [password, setPassword] = useState("Harry@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
        console.log("login err", err)
      setError(err.response || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center my-6">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
