import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { useEffect } from "react";
// import { useState } from 'react'

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const reviewRequst = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data.data));
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-gray-500">No Requests Found!</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Your Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {requests.map((request, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="card-body items-center text-center">
              {/* Profile Picture */}
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      request.photoUrl ||
                      "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
                    }
                    alt="Profile"
                  />
                </div>
              </div>

              {/* Name */}
              <h2 className="card-title">
                {request.fromUserId.firstName} {request.fromUserId.lastName}
              </h2>

              {/* Gender & Age */}
              <p className="text-gray-500">
                {request.gender}, {request.age} years old
              </p>

              {/* About Section */}
              <p className="text-sm text-gray-600 mt-2 italic">
                {request.about || "No bio available"}
              </p>

              {/* Action Buttons */}
              <div className="card-actions mt-4">
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => reviewRequst("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-active btn-secondary"
                  onClick={() => reviewRequst("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
