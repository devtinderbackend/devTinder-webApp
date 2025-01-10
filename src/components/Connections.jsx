import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data || []));
    } catch (err) {
      console.error("Invalid Connection", err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-gray-500">
          No Connections Found!
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Your Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {connections.map((connection, index) => (
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
                      connection.photoUrl ||
                      "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
                    }
                    alt="Profile"
                  />
                </div>
              </div>

              {/* Name */}
              <h2 className="card-title">
                {connection.firstName} {connection.lastName}
              </h2>

              {/* Gender & Age */}
              <p className="text-gray-500">
                {connection.gender}, {connection.age} years old
              </p>

              {/* About Section */}
              <p className="text-sm text-gray-600 mt-2 italic">
                {connection.about || "No bio available"}
              </p>

              {/* Action Buttons */}
              <div className="card-actions mt-4">
                <button className="btn btn-primary btn-sm">Message</button>
                <button className="btn btn-outline btn-sm">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
