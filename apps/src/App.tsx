import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import { sendMessageToAI } from './services/ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(content);
      const aiMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get response", error);
      const errorMessage: Message = { role: 'assistant', content: "申し訳ありません、エラーが発生しました。" };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#343541] text-white font-sans antialiased overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#202123]">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main className="flex-1 relative h-full flex flex-col bg-white">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200 text-gray-800 md:hidden bg-white z-10">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-md">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="font-bold text-[#F48024]">高卒就職エージェントAI</div>
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto w-full scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">高卒就職エージェントAI</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                  <h2 className="text-lg font-medium mb-2 text-gray-700">相談例</h2>
                  <p className="text-sm text-gray-500">"事務の求人を探して"</p>
                  <p className="text-sm text-gray-500 mt-2">"面接の練習をしたい"</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                  <h2 className="text-lg font-medium mb-2 text-gray-700">できること</h2>
                  <p className="text-sm text-gray-500">あなたの希望に合った求人を提案します</p>
                  <p className="text-sm text-gray-500 mt-2">履歴書の書き方や面接対策もサポート</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full pb-32">
              {messages.map((msg, index) => (
                <MessageBubble key={index} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div className="w-full p-4 md:py-6 bg-gray-50 dark:bg-[#444654] border-b border-black/10 dark:border-gray-900/50">
                  <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl m-auto flex">
                    <div className="w-[30px] flex flex-col relative items-end">
                      <div className="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center bg-[#19c37d]">
                        <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 animate-pulse" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <span className="animate-pulse">...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </main>
    </div>
  );
}

export default App;
