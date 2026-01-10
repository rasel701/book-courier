import React, { useContext } from "react";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import useAxios from "../../Hooks/useAxios";
import useRole from "../../Hooks/useRole";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(UserAuthContext);
  const { role } = useRole();
  const axiosInstance = useAxios();

  const handleChangeNameAndImage = (e) => {
    e.preventDefault();
    const form = e.target;
    const newName = form.name.value || user?.displayName;
    const newImage = form.image.value || user?.photoURL;

    if (!newName.trim() || !newImage.trim()) {
      return toast.error("Name and Image fields cannot be empty");
    }

    updateUser(newName, newImage)
      .then(() => {
        setUser({ ...user, displayName: newName, photoURL: newImage });

        axiosInstance
          .patch(`/user/${role?._id}`, { name: newName, image: newImage })
          .then((res) => {
            toast.success("Profile updated successfully!");
            form.reset();
          })
          .catch((error) => {
            console.error(error);
            toast.error("Database update failed");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Firebase update failed");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-primary tracking-tight">
          Profile Settings
        </h2>
        <p className="text-gray-500 text-sm">
          Manage your personal information and profile picture
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-2xl border border-base-200 overflow-hidden">
            <div className="h-24 bg-primary w-full"></div>
            <div className="px-6 pb-6 text-center">
              <div className="relative -mt-12 inline-block">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-base-100 shadow-md object-cover"
                />
                <span className="absolute bottom-2 right-0 w-4 h-4 bg-green-500 border-2 border-base-100 rounded-full"></span>
              </div>
              <h3 className="text-xl font-bold mt-3 text-gray-800 uppercase tracking-tighter">
                {user?.displayName}
              </h3>
              <div className="badge badge-primary badge-outline mt-1 font-bold">
                {role?.role?.toUpperCase()}
              </div>
              <p className="text-xs text-gray-400 mt-4 italic">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <form
              onSubmit={handleChangeNameAndImage}
              className="card-body gap-6"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-600 uppercase text-xs">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  placeholder="Update your name"
                  className="input input-bordered focus:input-primary transition-all bg-base-200/50"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-600 uppercase text-xs">
                    Profile Image URL
                  </span>
                </label>
                <input
                  type="text"
                  name="image"
                  defaultValue={user?.photoURL}
                  placeholder="Enter image link"
                  className="input input-bordered focus:input-primary transition-all bg-base-200/50"
                />
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-8 shadow-lg shadow-primary/20"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
