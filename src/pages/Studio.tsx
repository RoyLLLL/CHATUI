import React, { useState } from 'react';
import CreateBotInterface from '../components/CreateBotInterface'

// Studio 主组件 (Studio main component)
export const Studio: React.FC = () => {
    // 用户创建的 Bot 列表 (List of bots created by the user)
    const userBots = [
        { id: 1, name: 'test ChatBot', description: 'test' },
        { id: 2, name: 'test2 ChatBot', description: 'test2' },
        { id: 3, name: 'MyTestBot ChatBot', description: 'MyTestBot' },
    ];

    // 控制创建界面的状态 (State to control the creation interface visibility)
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Studio</h2>
            <div className="flex space-x-4">
                {/* 创建应用的卡片 (Create APP card) */}
                <CreateAppCard setIsCreating={setIsCreating} />
                {/* 用户创建的 Bot 卡片列表 (List of user-created bot cards) */}
                {userBots.map((bot) => (
                    <BotCard key={bot.id} name={bot.name} description={bot.description} />
                ))}
            </div>
            {/* 当 isCreating 为 true 时显示创建界面 (Show creation interface when isCreating is true) */}
            {isCreating && <CreateBotInterface setIsCreating={setIsCreating} />}
        </div>
    );
};

// CreateAppCard 组件 (CreateAppCard component)

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

// BotCard 组件 (BotCard component)
interface BotCardProps {
    name: string;
    description: string;
}

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

