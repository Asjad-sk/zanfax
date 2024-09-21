"use client";
import React, { useEffect, useState } from "react";
import CreateProduct from "@/app/component/CreateProduct";
import { getSession } from "next-auth/react";

export default function Dashboard() {
  const [isAdmin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      const userSession = await getSession();
      if (userSession && userSession.user) {
        setAdmin(userSession.user.isAdmin);
      }
    };
    fetchSession();
  }, []);

  return (
    <div>
      {isAdmin ? (
        <CreateProduct />
      ) : (
        <div>You are not an admin</div>
      )}
    </div>
  );
}
