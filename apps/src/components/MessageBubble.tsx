import React from 'react';

interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
    const isAi = role === 'assistant';
    return (
        <div className={`group w-full text-gray-800 border-b border-gray-100 ${isAi ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
                <div className="flex-shrink-0 flex flex-col relative items-end">
                    <div className="w-[30px]">
                        {isAi ? (
                            <div className="relative p-1 rounded-sm h-[30px] w-[30px] text-white flex items-center justify-center bg-[#F48024]">
                                <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                            </div>
                        ) : (
                            <div className="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center bg-gray-400">
                                U
                            </div>
                        )}
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden">
                    <div className="prose prose-slate whitespace-pre-wrap leading-7">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
