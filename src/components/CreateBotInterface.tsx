import React, { useState } from 'react';

// 定义 EmojiSelectionModal 的 props 接口
interface EmojiSelectionModalProps {
    initialEmoji: string;
    onSelect: (emoji: string, tab: string) => void;
    onClose: () => void;
    onImageUpload: (imageData: string) => void;
}

// 使用 React.FC 并传入 props 类型
const EmojiSelectionModal: React.FC<EmojiSelectionModalProps> = ({ initialEmoji, onSelect, onClose, onImageUpload }) => {
    const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Emoji'); // Tab state: 'Emoji' or 'Image'

    const emojis = [
        '🤖', '😀', '😎', '🥳', '🤔', '😡', '👻', '👽', '👍', '👎',
        '✌️', '👌', '🤘', '🤙', '👈', '😈', '📷'
    ];

    const filteredEmojis = emojis.filter(emoji => emoji.includes(searchQuery));

    // 为 handleFileChange 添加事件类型
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 可选链操作符确保 files 存在
        if (file && ['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    onImageUpload(reader.result as string); // 类型断言确保 result 是 string
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('Unsupported file format. Please upload PNG, JPG, JPEG, WEBP, or GIF.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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

                {activeTab === 'Emoji' && (
                    <>
                        <input
                            type="text"
                            placeholder="Search emojis..."
                            className="w-full border rounded p-2 mb-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
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

export default EmojiSelectionModal;