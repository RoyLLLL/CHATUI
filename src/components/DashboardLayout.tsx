import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const DashboardLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="flex justify-center items-center space-x-8 mb-6 bg-white p-4 shadow-sm rounded-md">
                <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                        `text-lg font-medium px-4 py-2 ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    Explore
                </NavLink>
                <NavLink
                    to="/studio"
                    className={({ isActive }) =>
                        `text-lg font-medium px-4 py-2 ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    Studio
                </NavLink>
                <NavLink
                    to="/tools"
                    className={({ isActive }) =>
                        `text-lg font-medium px-4 py-2 ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    Tools
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
};
