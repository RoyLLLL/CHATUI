import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const StudioChat = () => {
  return (
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          <h1 className="text-lg font-semibold">Orchestrate</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Publish</button>
        </div>

        {/* Main Content */}
        <div className="flex flex-grow">
          {/* Left Panel */}
          <div className="w-2/3 p-6 bg-white shadow-md">
            <h2 className="text-md font-semibold mb-2">Instructions</h2>
            <textarea
                className="w-full h-24 border rounded p-2"
                placeholder="Write your prompt here..."
            ></textarea>

            <div className="mt-4">
              <h3 className="text-sm font-semibold">Variables</h3>
              <button className="mt-2 px-4 py-2 text-blue-500 border rounded-lg flex items-center">
                <PlusIcon className="h-4 w-4 mr-2" /> Add
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold">Context</h3>
              <button className="mt-2 px-4 py-2 text-blue-500 border rounded-lg">+ Add</button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/3 p-6 bg-white shadow-md border-l">
            <h2 className="text-md font-semibold">Debug & Preview</h2>
            <div className="h-full bg-gray-50 flex items-center justify-center text-gray-400">
              No preview available
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-white flex items-center">
          <input
              type="text"
              className="flex-grow border rounded p-2"
              placeholder="Talk to Bot"
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
        </div>
      </div>
  );
};

export default StudioChat;