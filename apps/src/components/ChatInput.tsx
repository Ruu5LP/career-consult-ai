import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || disabled) return;
        onSend(input);
        setInput('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <div className="w-full p-4 border-t border-gray-200 bg-white absolute bottom-0 left-0 bg-gradient-to-t from-white via-white to-transparent">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="relative flex items-center w-full p-3 bg-white rounded-lg border border-gray-300 shadow-md focus-within:ring-2 focus-within:ring-[#F48024] focus-within:border-transparent transition-all">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="メッセージを送信..."
                        className="w-full bg-transparent border-0 focus:ring-0 text-gray-800 placeholder-gray-400 outline-none resize-none max-h-[200px] overflow-y-auto m-0 pr-10"
                        style={{ maxHeight: '200px' }}
                        disabled={disabled}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || disabled}
                        className={`absolute right-3 p-1 rounded-md transition-colors ${input.trim() && !disabled ? 'bg-[#F48024] text-white hover:bg-[#d66e1d]' : 'text-gray-400 bg-transparent cursor-not-allowed'
                            }`}
                    >
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
                <div className="text-center text-xs text-gray-400 mt-2">
                    無料リサーチプレビュー。ChatGPTは、人、場所、または事実について不正確な情報を生成する可能性があります。
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
