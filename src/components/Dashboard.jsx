import React from "react";
import { useSelector } from "react-redux";
import { PostList } from "./PostList";
import { NotificationStack } from "./NotificationStack";
import { DirectMessagesQueue } from "./DirectMessagesQueue";
import s from "./Dashboard.module.scss";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={s.wrapper}>
      <div className={s.grid}>
        <PostList />
        <NotificationStack />
        <DirectMessagesQueue />
      </div>
    </div>
  );
};
