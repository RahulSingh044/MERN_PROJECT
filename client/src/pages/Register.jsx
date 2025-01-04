import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { storerTokenInLS } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withcredentials: true,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("User registered successfully");
        storerTokenInLS(result.token);
        navigate("/");
      } else {
        toast.error(result.extraDetails);
      }
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 px-44">
      <section className="h-full">
        <main className="px-20 py-20">
          <div className="flex gap-8 w-full">
            <div className="left-side w-1/2 h-full">
              <img src="/images/register.png" />
            </div>
            <div className="register-form w-1/2 p-2 px-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center w-full"
              >
                <h1 className="text-4xl font-semibold  border-b-4 border-blue-500">
                  Registration Form
                </h1>
                <div className="flex flex-col gap-2 mt-8 w-full">
                  <label htmlFor="username">UserName:</label>
                  <input
                    type="text"
                    id="username"
                    className="p-2 rounded-lg text-black"
                    autoComplete="off"
                    required
                    {...register("username", { required: true })}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                  <label htmlFor="mobile">Mobile:</label>
                  <input
                    type="text"
                    id="mobile"
                    required
                    className="p-2 rounded-lg text-black"
                    {...register("mobile", { required: true })}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    required
                    id="email"
                    className="p-2 rounded-lg text-black"
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="p-2 rounded-lg text-black"
                    {...register("password", { required: true })}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 w-full rounded-2xl mt-8"
                >
                  {" "}
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
