"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useUser } from "@clerk/nextjs";

export default function Socket() {
  const [isConnected, setIsConnected] = useState(false);

  const { user, isLoaded, isSignedIn } = useUser();
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      if (!isLoaded) {
        return <div>Loading...</div>;
      }

      if (!isSignedIn) {
        return <div>Sign in to view this page</div>;
      }
      if (user) socket.emit("newUser", user?.username);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="absolute -right-3 -top-7">
      {isConnected ? (
        <span className="text-6xl text-lime-400">&middot;</span>
      ) : (
        <span className="text-xs text-lime-400">(offline)</span>
      )}
    </div>
  );
}
