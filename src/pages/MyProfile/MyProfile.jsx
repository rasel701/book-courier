import React, { useContext } from "react";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import useAxios from "../../Hooks/useAxios";
import useRole from "../../Hooks/useRole";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(UserAuthContext);
  const { role } = useRole();
  console.log(role?._id);

  const axiosInstance = useAxios();

  const handleChangeNameAndImage = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    console.log({ name, image });
    updateUser(name, image)
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: image });
        axiosInstance
          .patch(`/user/${role?._id}`, { name, image })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount) {
              toast.success("User name and profile image successfully update");
              e.target.reset();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

      {/* USER INFO CARD */}
      <div className="card bg-base-100 shadow-md p-6 mb-8">
        <div className="flex items-center gap-6">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-24 h-24 rounded-full border"
          />

          <div>
            <h3 className="text-xl font-semibold">{user?.displayName}</h3>
            <p className="text-sm opacity-70">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* UPDATE FORM (DESIGN ONLY) */}
      <div>
        <form
          onSubmit={handleChangeNameAndImage}
          className="card bg-base-100 shadow-md p-6 space-y-4"
        >
          <div>
            <label className="font-semibold">Update Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="Enter new name"
              name="name"
            />
          </div>

          <div>
            <label className="font-semibold">Update Profile Image</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="Enter your profile image"
              name="image"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
