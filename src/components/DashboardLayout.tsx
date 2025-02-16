// 文件：src/components/DashboardLayout.tsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const DashboardLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* 固定的顶部导航栏，只显示一行 */}
            <div className="flex justify-center items-center space-x-8 mb-6 bg-white p-4 shadow-sm rounded-md">
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
                <NavLink
                    to="/agent"
                    className={({ isActive }) =>
                        `text-lg font-medium px-4 py-2 ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    Agent
                </NavLink>
                <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                        `text-lg font-medium px-4 py-2 ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    Chat
                </NavLink>
                <NavLink
                    to="/setting"
                    className={({ isActive }) =>
                        `text-lg font-medium px-4 py-2 ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    Setting
                </NavLink>
            </div>
            {/* 根据嵌套路由显示页面内容 */}
            <Outlet />
        </div>
    );
};
