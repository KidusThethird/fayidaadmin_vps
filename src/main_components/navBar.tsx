"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";
import { apiUrl } from "@/api_config";
import { Bell } from "lucide-react";
import Link from "next/link";
import { setAccessToken, getAccessToken, clearAccessToken } from "../lib/tokenManager";
export default function NavBar() {
  //const profile = response3;
  //const routerPathname = usePathname();
  const accessToken = getAccessToken();

  const [data, setData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [isLoading, setLoading] = useState(true);
  //const [userName, setUserName] = useState("");
  const [activeMenu, setActiveMenu] = useState("Home");

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${apiUrl}/notifications/admin/count/`, {  headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
        }, })
        .then((res) => res.json())
        .then((data) => {
          setNotificationData(data.message);
          setNotificationNumber(Object.keys(data).length);
        });
    }, 10000); // Refetch every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on cleanup
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/login_register/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setLoading(false);
        // setUserName(data.firstName + " " + data.lastName);
        console.log("message: " + data);
      });
  }, []);
  const setTokenLogout= () =>{

    setAccessToken("0");
    window.location.href = "/login";
  }
  return (
    <div className="fixed w-full bg-navBarColor text-white z-50">
      <div className="flex justify-between px-10 my-2">
        <h1 className="text-lg font-semibold">Fayida Acadamy</h1>

        <div className="space-x-5 flex">
          <Link href="/notifications">
            <div className="relative px-3">
              <div className="absolute top-0 right-0 ">
                {notificationNumber != 0 && (
                  <h1 className="bg-red-700 text-white px-1 text-sm rounded">
                    {notificationNumber}
                  </h1>
                )}
              </div>
              <Bell />
            </div>
          </Link>

          <div>
            <Popover>
              <PopoverTrigger>
                <h1 className="font-semibold">Admin</h1>
              </PopoverTrigger>

              <PopoverContent>
                <div>
                 
                <button onClick={()=>setTokenLogout()}>
                  <div className="flex space-x-1 nav_bar_hover_dropdown ">
                    <LogOut size={20} className="" />
                    <h1>Log Out</h1>
                  </div>
                </button>
                  
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
