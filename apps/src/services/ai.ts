export const sendMessageToAI = async (message: string): Promise<string> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple mock responses based on keywords
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('hello') || lowerMsg.includes('こんにちは')) {
        return "こんにちは！高卒就職エージェントAIです。求人探し、履歴書の書き方、面接対策など、何でも相談してくださいね。";
    }
    if (lowerMsg.includes('求人') || lowerMsg.includes('仕事') || lowerMsg.includes('探して')) {
        return "求人をお探しですね。希望の職種（事務、製造、販売など）や勤務地はありますか？あなたの希望に合わせてピックアップします。";
    }
    if (lowerMsg.includes('面接') || lowerMsg.includes('練習')) {
        return "面接対策ですね、素晴らしいです！よく聞かれる質問の練習をしましょうか？それともマナーについて知りたいですか？";
    }
    if (lowerMsg.includes('履歴書') || lowerMsg.includes('志望動機')) {
        return "履歴書の作成は悩みますよね。志望動機の書き方や、自己PRのポイントについてアドバイスできますよ。";
    }
    if (lowerMsg.includes('進路') || lowerMsg.includes('迷って')) {
        return "進路について迷っているんですね。まずはあなたの好きなことや得意なことから、向いている仕事を一緒に考えてみましょう。";
    }

    return `ご相談ありがとうございます。「${message}」についてですね。より詳しいアドバイスをするために、もう少し具体的に教えていただけますか？`;
};
