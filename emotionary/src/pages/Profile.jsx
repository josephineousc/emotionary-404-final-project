import React from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";

export default function Profile({ match }) {
  const userId = match.params.userId;

  return (
    <div>
      <h1>User Profile</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={`/profile/${userId}/reactions`} activeclassname="active">
              Reactions
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${userId}/bookmarks`} activeclassname="active">
              Bookmarks
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
