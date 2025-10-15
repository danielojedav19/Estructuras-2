import React from "react";
import { useSelector } from "react-redux";
import { PostList } from "./PostList";
import { NotificationStack } from "./NotificationStack";
import { DirectMessagesQueue } from "./DirectMessagesQueue";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="layout-content">
      <div>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <PostList />
          <NotificationStack />
          <DirectMessagesQueue />
        </div>
      </div>
    </div>
  );
};
