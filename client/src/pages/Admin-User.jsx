import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { MdDelete } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const { authToken } = useAuth();
  const nav = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Deleting users
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASEURL}/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authToken,
          },
        }
      );
      const result = await response.json();
      if (result.ok) {
        toast.success("User deleted successfully");
        nav("/admin/users");
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <section className="w-full h-screen p-6">
          <div>
            <h1 className="text-6xl mb-6">User's Data</h1>
          </div>
          <div>
            <table className="bg-white text-black rounded-2xl border-3 border-black">
              <thead>
                <tr className="grid grid-cols-5 align-center p-4 border-2 border-black">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white text-black rounded-xl ">
                {users.map((curr_user, index) => (
                  <tr
                    key={index}
                    className="grid grid-cols-5 p-5 text-center border-2 border-black"
                  >
                    <td>{curr_user.username}</td>
                    <td>{curr_user.email}</td>
                    <td>{curr_user.mobile}</td>
                    <td>
                      <button className="bg-green-600 px-4 py-1 text-white rounded-xl">
                        <Link to={`/admin/users/${curr_user._id}/edit`}>
                          Update
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteUser(curr_user._id)}
                        className="text-red-600 text-4xl"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </section>
    </>
  );
}
