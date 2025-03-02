import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const StudioChat = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <h1 className="text-lg font-semibold">Orchestrate</h1>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Publish
                </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-grow">
                {/* Left Panel */}
                <div className="w-1/2 p-6 bg-white shadow-md border-r">
                    <h2 className="text-md font-semibold mb-2">Instructions</h2>
                    <textarea
                        className="w-full h-24 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Write your prompt here..."
                    ></textarea>

                    <div className="mt-4 space-y-3">
                        {/* Variables Section */}
                        <div>
                            <h3 className="text-sm font-semibold">Variables</h3>
                            <button className="mt-2 px-4 py-2 text-blue-500 border rounded-lg flex items-center hover:bg-gray-100">
                                <PlusIcon className="h-4 w-4 mr-2" /> Add
                            </button>
                        </div>

                        {/* Context Section */}
                        <div>
                            <h3 className="text-sm font-semibold">Context</h3>
                            <button className="mt-2 px-4 py-2 text-blue-500 border rounded-lg hover:bg-gray-100">
                                + Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel (Chat & Preview) */}
                <div className="w-1/2 p-6 bg-white shadow-md flex flex-col">
                    <h2 className="text-md font-semibold mb-2">Debug & Preview</h2>
                    <div className="flex-grow bg-gray-50 flex items-center justify-center text-gray-400 border rounded">
                        No preview available
                    </div>

                    {/* Chat Input */}
                    <div className="mt-4 flex items-center border-t pt-4">
                        <input
                            type="text"
                            className="flex-grow border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Talk to Bot"
                        />
                        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioChat;
