import React, { useState } from 'react';

// Emoji Selection Modal Component
// Handles emoji selection and image upload
const EmojiSelectionModal = ({ initialEmoji, onSelect, onClose, onImageUpload }) => {
    const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Emoji'); // Tab state: 'Emoji' or 'Image'

    // Sample emojis for selection
    const emojis = [
        '🤖', '😀', '😎', '🥳', '🤔', '😡', '👻', '👽', '👍', '👎',
        '✌️', '👌', '🤘', '🤙', '👈', '😈', '📷'
    ];

    // Filter emojis based on search query
    const filteredEmojis = emojis.filter(emoji => emoji.includes(searchQuery));

    // Handle image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && ['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
            const reader = new FileReader();
            reader.onload = () => onImageUpload(reader.result);
            reader.readAsDataURL(file);
        } else {
            alert('Unsupported file format. Please upload PNG, JPG, JPEG, WEBP, or GIF.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Top Tabs: Emoji and Image */}
                <div className="flex mb-4">
                    <button
                        className={`flex-1 py-2 ${activeTab === 'Emoji' ? 'bg-gray-200' : 'bg-white'} rounded-l-lg`}
                        onClick={() => setActiveTab('Emoji')}
                    >
                        <span className="text-2xl mr-2">🤖</span> Emoji
                    </button>
                    <button
                        className={`flex-1 py-2 ${activeTab === 'Image' ? 'bg-gray-200' : 'bg-white'} rounded-r-lg`}
                        onClick={() => setActiveTab('Image')}
                    >
                        <span className="text-2xl mr-2">📷</span> Image
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'Emoji' && (
                    <>
                        {/* Emoji Search Bar */}
                        <input
                            type="text"
                            placeholder="Search emojis..."
                            className="w-full border rounded p-2 mb-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {/* Emoji Grid */}
                        <div className="grid grid-cols-5 gap-2 mb-4">
                            {filteredEmojis.map((emoji) => (
                                <button
                                    key={emoji}
                                    className={`text-2xl p-1 rounded ${selectedEmoji === emoji ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => setSelectedEmoji(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'Image' && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp, image/gif"
                            onChange={handleFileChange}
                            className="hidden"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <div className="text-gray-500">Drag and drop an image here, or <span className="text-blue-500">browse</span></div>
                            <div className="text-sm text-gray-400">Supports PNG, JPG, JPEG, WEBP, and GIF</div>
                        </label>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSelect(selectedEmoji, activeTab)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main CreateBotInterface Component
const CreateBotInterface = ({ setIsCreating }) => {
    const [botName, setBotName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('🤖');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);

    // Handle selection from modal
    const handleSelect = (emoji, tab) => {
        if (tab === 'Emoji' && emoji) {
            setSelectedEmoji(emoji);
            setUploadedImage(null); // Reset image if emoji is selected
        } else if (tab === 'Image' && uploadedImage) {
            setSelectedEmoji(null); // Reset emoji if image is uploaded
        }
        setIsEmojiModalOpen(false);
    };

    // Handle image upload
    const handleImageUpload = (imageData) => {
        setUploadedImage(imageData);
    };

    // Create bot
    const handleCreate = () => {
        if (selectedEmoji) {
            console.log('Creating bot with emoji:', { botName, description, selectedEmoji });
        } else if (uploadedImage) {
            console.log('Creating bot with image:', { botName, description, uploadedImage });
        } else {
            alert('Please select an emoji or upload an image.');
        }
        setIsCreating(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Title */}
                <h2 className="text-xl font-bold mb-4 text-gray-800">App Name & Icon</h2>
                {/* App Name Input with Icon */}
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        placeholder="Give your app a name"
                        className="flex-1 border rounded p-2 bg-gray-100 text-gray-700 placeholder-gray-400"
                    />
                    <div
                        className="ml-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-sm"
                        style={{ backgroundColor: '#FFDAB9' }}
                        onClick={() => setIsEmojiModalOpen(true)}
                    >
                        <span className="text-2xl">{selectedEmoji || '🤖'}</span>
                    </div>
                </div>
                {/* Description */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Description (Optional)</h3>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter the description of the app"
                        className="w-full border rounded p-2 bg-gray-100 text-gray-700 placeholder-gray-400"
                        rows={3}
                    />
                </div>
                {/* Template Hint */}
                <p className="text-sm text-gray-600 mb-4">
                    No ideas?{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Check out our templates →
                    </a>
                </p>
                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsCreating(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 flex items-center"
                    >
                        Create <span className="ml-2">✨</span>
                    </button>
                </div>
            </div>
            {/* Emoji and Image Selection Modal */}
            {isEmojiModalOpen && (
                <EmojiSelectionModal
                    initialEmoji={selectedEmoji}
                    onSelect={handleSelect}
                    onClose={() => setIsEmojiModalOpen(false)}
                    onImageUpload={handleImageUpload}
                />
            )}
        </div>
    );
};

export default CreateBotInterface;