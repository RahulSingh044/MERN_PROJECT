import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

export default function AdminUpdate() {
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState("");
  const { id } = useParams();
  const nav = useNavigate();

  if (user) {
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("mobile", user.mobile);
  }

  const { authToken } = useAuth();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASEURL}/api/admin/user/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(id);
      setUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // to handle the updation of data
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASEURL}/api/admin/user/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Data updated successfully");
        nav("/admin/users");
      } else {
        toast.error("Failed to update data");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  return (
    <>
      <section className="h-screen m-auto py-10">
        <div className="w-full flex justify-center items-center border-2 border-blue-400 rounded-xl drop-shadow-2xl">
          <div className="h-full p-20">
            <span className="text-4xl font-bold border-b-2 border-blue-600">
              Update user Data
            </span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 py-8"
            >
              <div className="flex flex-col">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="username"
                  className="p-2 rounded-lg text-black"
                  {...register("username", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="p-2 rounded-lg text-black"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="mobile">Mobile:</label>
                <input
                  type="text"
                  id="mobile"
                  className="p-2 rounded-lg text-black"
                  {...register("mobile", { required: true })}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-2xl mt-8"
              >
                {" "}
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
