// 文件：src/pages/ChatPage.tsx
import React from 'react';

export const ChatPage: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Chat Interface</h2>
            {/* 这里可嵌入聊天组件 */}
            <p>This is the chat page. Chat interface goes here.</p>
        </div>
    );
};
