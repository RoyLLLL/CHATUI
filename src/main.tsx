// 文件：src/main.tsx
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App.tsx";
import { NotFound } from "./components/NotFound.tsx";

// 新增引入 DashboardLayout 和各子页面组件
import { DashboardLayout } from "./components/DashboardLayout";
import { ToolsPage } from "./pages/ToolsPage";
import { AgentPage } from "./pages/AgentPage";
import { ChatPage } from "./pages/ChatPage";
import { SettingPage } from "./pages/SettingPage";

function getCookie(name: string) {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
}

document.addEventListener("DOMContentLoaded", () => {
    const userId =
        localStorage.getItem("opengpts_user_id") ||
        getCookie("opengpts_user_id") ||
        uuidv4();

    localStorage.setItem("opengpts_user_id", userId);
    const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const expires = new Date(Date.now() + weekInMilliseconds).toUTCString();
    document.cookie = `opengpts_user_id=${userId}; path=/; expires=${expires}; SameSite=Lax;`;
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* 原有路由，不使用 DashboardLayout */}
                    <Route path="/thread/:chatId" element={<App />} />
                    <Route path="/assistant/:assistantId/edit" element={<App edit={true} />} />
                    <Route path="/assistant/:assistantId" element={<App />} />
                    <Route path="/" element={<App />} />

                    {/* 嵌套路由：DashboardLayout 固定顶部导航 */}
                    <Route element={<DashboardLayout />}>
                        <Route path="/tools" element={<ToolsPage />} />
                        <Route path="/agent" element={<AgentPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/setting" element={<SettingPage />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
