import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-[260px] bg-white text-gray-800 flex flex-col h-screen border-r border-gray-200 shadow-sm">
            <div className="p-3">
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-md bg-[#F48024] hover:bg-[#d66e1d] text-white transition-colors text-sm text-left shadow-sm font-bold">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    新しい相談
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2 p-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500">今日</div>
                    {/* Mock History Items */}
                    <button className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-gray-100 cursor-pointer break-all hover:pr-4 group text-gray-700">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                            <span className="text-sm">以前の相談</span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-200 p-3">
                <button className="flex w-full items-center gap-3 rounded-md hover:bg-gray-100 px-3 py-3 transition-colors duration-200 text-gray-700 cursor-pointer text-sm">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-[#F48024] rounded-sm flex items-center justify-center text-white font-bold">
                            U
                        </div>
                    </div>
                    <div className="font-bold">ユーザー</div>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
