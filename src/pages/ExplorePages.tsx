import React, { useState } from 'react';
import { AgentItem } from '../api/assistants';
import { getAllAgents } from '../api/assistants';
import { ToolDetailModal } from '../components/Modals/ToolDetailModal';
import { Chat } from "../components/Chat";
import { Link } from 'react-router-dom'; // Link component for navigation
import AgentCard from "../components/AgentCard";
import { ChatList } from "../components/ChatList";


export const ExplorePages: React.FC = () => {

    const allAgents: AgentItem[] = getAllAgents();

    const [selectedTool, setSelectedTool] = useState<AgentItem | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [activeChatTool, setActiveChatTool] = useState<AgentItem | null>(null);
    const [isDiscoveryPage, setIsDiscoveryPage] = useState(false); // New state to track whether we're on the discovery page

    // Dummy data and functions for ChatList props (replace with actual data as needed)
    const dummyChats = [];
    const dummyConfigs = [];
    const enterChat = (id: string | null) => {
        console.log("Enter chat", id);
    };
    const deleteChat = (id: string) => {
        console.log("Delete chat", id);
    };
    const enterConfig = (id: string | null) => {
        console.log("Enter config", id);
    };



    // Mock functions for stream and stopStream (replace with real ones if needed)
    const startStream = async (message: any, threadId: string, assistantType: string) => {
        console.log(`Starting stream with message: ${message}, threadId: ${threadId}, assistantType: ${assistantType}`);
        // Implement actual stream logic here
    };

    const stopStream = () => {
        console.log("Stopping stream");
        // Implement actual stop stream logic here
    };
    const stream = { status: "idle" }; // Replace with actual stream status from your state management


    const handleCardClick = (tool: AgentItem) => {
        setSelectedTool(tool);
        setShowDetailModal(true);
        setIsDiscoveryPage(false); // Reset discovery state to show chat
    };

    // Handle workspace name click (switch to Chat)
    const handleWorkspaceToolClick = (tool: AgentItem) => {
        setActiveChatTool(tool); // Set the active tool for the chat page
        setSelectedTool(null); // Close the modal (if open)
        setShowDetailModal(false); // Close the modal
    };

    const handleStartTool = () => {
        if (selectedTool) {
            setShowDetailModal(false);
        }
    };

    const handleDiscoveryClick = () => {
        setActiveChatTool(null); // Reset the active chat tool
        setIsDiscoveryPage(true); // Set the discovery page state to true to show the card list
    };


    // Handle closing the modal
    const handleCloseModal = () => {
        setShowDetailModal(false);
        setIsDiscoveryPage(true); // Show the card list again when modal is closed
    };

    return (
        <div className="flex">
            {/* Left Sidebar */}
            <div className="w-1/6 p-4">
                <Link to="/explore">
                    <button
                        className="bg-blue-500 text-white p-2 rounded mb-6 w-full"
                        onClick={handleDiscoveryClick} // Trigger the reset of discovery page state
                    >
                        Discovery
                    </button>
                </Link>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">WORKSPACE</h2>
                    <ul>
                        {allAgents.map((tool, index) => (
                            <li
                                key={index}
                                className="text-gray-700 cursor-pointer hover:text-blue-500"
                                onClick={() => handleWorkspaceToolClick(tool)} // Switch to Chat on click
                            >
                                {tool.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="w-5/6 p-4">
                {/* Conditionally render Chat or ToolDetailModal or the Card List */}
                {activeChatTool ?(
                    // When a chat is active, show both the ChatList and Chat components side by side.
                    <div className="flex">
                        {/* ChatList (left side of right panel) */}
                        <div className="w-1/6 p-2 border-r">
                            <ChatList
                                chats={dummyChats}
                                configs={dummyConfigs}
                                enterChat={enterChat}
                                deleteChat={deleteChat}
                                enterConfig={enterConfig}
                            />
                        </div>
                        {/* Chat (right side of right panel) */}
                        <div className="w-5/6 p-2">
                            <Chat
                                startStream={startStream}
                                stopStream={stopStream}
                                stream={stream}
                            />
                        </div>
                    </div>
                ) :  (
                    // If no tool is selected for chat and not on the discovery page, show the tool card list
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allAgents.map((tool, index) => (
                            <AgentCard
                                key={index}
                                tool={tool}
                                onClick={() => handleCardClick(tool)} // Open ToolDetailModal
                            />
                        ))}
                    </div>
                )}

                {showDetailModal && selectedTool && (
                    <ToolDetailModal
                        tool={selectedTool}
                        onClose={handleCloseModal} // Close modal and show card list
                        onStart={handleStartTool}
                    />
                )}
            </div>
        </div>
    );
};
