"use client";
import { useEffect, useState } from "react";
import Image from "./Image";
import { socket } from "@/socket";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface NotificationType {
  id: string;
  senderUsername: string;
  type: "like" | "comment" | "rePost" | "follow";
  link: string;
}
const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const router = useRouter();
  const reset = () => {
    setNotifications([]);
  };
  useEffect(() => {
    socket.on("getNotification", (data: NotificationType) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, []);

  const handleClick = (notification: NotificationType) => {
    const filteredList = notifications.filter((n) => n.id !== notification.id);
    setNotifications(filteredList);

    router.push(notification.link);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <Image
            src={`icons/notification.svg`}
            alt="Notification"
            w={24}
            className="border-none outline-none"
            h={24}
          />
          {notifications.length > 0 && (
            <div className="absolute -right-2.5 text-sm -top-1.5 bg-iconBlue/70 font-bold rounded-full p-1 flex justify-center items-center text-white">
              {notifications.length}
            </div>
          )}
        </div>
        <p className="hidden lg:inline">Notifications</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black border-[1px] border-textGrayLight">
        <h1 className="text-sm text-center border-none outline-none text-textGray">
          Notifications
        </h1>
        {notifications.map((n) => (
          <DropdownMenuItem
            key={n.id}
            className="cursor-pointer text-white"
            onClick={() => handleClick(n)}
          >
            <p className="text-iconBlue font-bold">{n.senderUsername}</p>{" "}
            {n.type === "like"
              ? "liked your post"
              : n.type === "comment"
              ? "replied your post"
              : n.type === "rePost"
              ? "re-posted your post"
              : "followed you."}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator
          className={notifications.length > 0 ? "" : "hidden"}
        />
        <DropdownMenuItem
          onClick={reset}
          className={
            notifications.length > 0
              ? "text-textGray text-center text-sm"
              : "hidden"
          }
        >
          Mark as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
