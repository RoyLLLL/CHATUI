import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App.tsx";
import { NotFound } from "./components/NotFound.tsx";

import { DashboardLayout } from "./components/DashboardLayout";
import { ExplorePages } from "./pages/ExplorePages.tsx";
import { AgentPage } from "./pages/AgentPage";
import { ChatPage } from "./pages/ChatPage";

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
                    <Route path="/thread/:chatId" element={<App />} />
                    <Route path="/assistant/:assistantId/edit" element={<App edit={true} />} />
                    <Route path="/assistant/:assistantId" element={<App />} />
                    <Route path="/" element={<App />} />

                    <Route element={<DashboardLayout />}>
                        <Route path="/explore" element={<ExplorePages />} />
                        <Route path="/studio" element={<ChatPage />} />
                        <Route path="/tools" element={<AgentPage />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
