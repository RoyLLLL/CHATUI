import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateBotInterface from '../components/CreateBotInterface';
import StudioChat from "../components/StudioChat.tsx";

export const Studio: React.FC = () => {
    const { botName } = useParams(); // 通过 URL 获取 bot_name

    // 用户创建的 Bot 列表
    const userBots = [
        { id: 1, name: 'test ChatBot', description: 'test' },
        { id: 2, name: 'test2 ChatBot', description: 'test2' },
        { id: 3, name: 'MyTestBot ChatBot', description: 'MyTestBot' },
    ];

    // 控制创建界面的状态
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Studio</h2>

            {botName ? (
                <StudioChat botName={botName} /> // 通过 URL 控制 StudioChat 显示
            ) : (
                <div className="flex space-x-4">
                    <CreateAppCard setIsCreating={setIsCreating} />
                    {userBots.map((bot) => (
                        <BotCard key={bot.id} name={bot.name} description={bot.description} />
                    ))}
                </div>
            )}

            {isCreating && <CreateBotInterface setIsCreating={setIsCreating} />}
        </div>
    );
};

// CreateAppCard 组件
const CreateAppCard = ({ setIsCreating }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white w-64 h-48 overflow-hidden">
            <h3 className="text-lg font-bold mb-2">CREATE APP</h3>
            <ul className="space-y-2">
                <li
                    className="cursor-pointer text-black underline hover:text-gray-900"
                    onClick={() => setIsCreating(true)}
                >
                    Create from Blank
                </li>
            </ul>
        </div>
    );
};

// BotCard 组件
const BotCard = ({ name, description }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white w-64 h-48 overflow-hidden">
            <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-orange-300 rounded-full mr-2"></div>
                <h3 className="text-lg font-bold">{name}</h3>
            </div>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    );
};
