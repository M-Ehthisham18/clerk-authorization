import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

const Container = () => {
  const { user } = useUser();
  const { getToken } = useAuth(); // ✅ import useAuth to get token
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ get token inside fetchData
        const token = await getToken(); 

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/analytics`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // ✅ pass token correctly
            },
          }
        );

        const data = await res.json();
        setApiData(data);
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    fetchData();
  }, [getToken]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-center">
      {user ? (
        <>
          <img src={user.imageUrl} className="rounded-full" />
          <div className="text-3xl text-focus font-bold">{user.fullName}</div>
        </>
      ) : (
        <div className="text-3xl text-accent font-bold">Log in to access</div>
      )}

      <h1 className="text-4xl font-extrabold">WELCOME TO CLERK AUTHORIZATION</h1>

      {apiData && (
        <pre className="text-white">{JSON.stringify(apiData.message, null, 2)}</pre>
      )}
    </div>
  );
};

export default Container;
