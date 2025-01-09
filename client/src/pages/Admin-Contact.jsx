import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminContact() {
  const { authToken } = useAuth();
  const [contact, setContact] = useState([]);
  const id = useParams();
  const nav = useNavigate();

  const getContactsData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}/api/admin/contact`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      if(!data || !Array.isArray(data)){
        setContact([])
      }else{
        setContact(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteContact = async (id) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BASEURL}/api/admin/contact/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: authToken,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          nav('/admin/contacts')
          toast.success("Contact deleted successfully");
        } else {
          toast.error("Contact Not deleted")
        }
      } catch (error) {
        console.error(error.message);
      }
   }

  useEffect(() => {
    getContactsData();
  }, []);

  if (contact.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-screen">
        <h2 className="text-6xl text-slate-400">No contacts available</h2>
        <p className="text-lg text-slate-400">You currently have no contacts. Please add some.</p>
      </div>
    );
  }

  return (
    <>
      <section className="w-full h-screen p-6">
        <div>
          <span className="text-6xl mb-6 border-b-2 border-blue-500">
            Contact Data
          </span>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-10">
          {contact.map((current, index) => {
              return (
                <div
                  className="card border-2 border-blue-300 p-4 rounded-xl"
                  key={index}
                >
                  <div className="flex justify-between">
                    <div className="font-bold mb-4 flex flex-col">
                      <span>{current.username}</span>
                      <span>{current.email}</span>
                    </div>
                    <button
                      onClick={() => deleteContact(current._id)}
                      className="text-red-600 text-4xl"
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <p className="text-xl">"{current.message}"</p>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
