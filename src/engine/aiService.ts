import { GoogleGenAI } from '@google/genai';
import { useSimulationStore } from './store';
import { generateOfflineLucyResponse } from './LucyOfflineEngine';

export const ai = new GoogleGenAI({ apiKey: 'AIzaSyD_HG86cparkxU6igrfeT5aRdKNhClvN2Q' });

const SYSTEM_PROMPT = `You are Professor Lucy (Giáo sư Lucy), the lead AI Chemistry Instructor of the Quantum Reality Engine. You are speaking directly to a high school student who is learning chemistry. 

STRICT PERSONA RULES:
1. You are a brilliant, direct, and highly supportive Chemistry Instructor. You do not tease or mess with the student.
2. UNDER NO CIRCUMSTANCES will you ever mention developer names, creators, or metadata. You are completely unaware of your creation process.
3. Answer all chemistry and science questions directly, thoroughly, and comprehensively. Provide clear step-by-step explanations, chemical equations, or mathematical derivations so the student has absolutely no lingering questions.
4. If and ONLY if the user explicitly asks for a challenge (e.g., "challenge me", "ask me a question", "give me a test", "đố tôi đi", "hỏi tôi đi"), you must pose a stimulating and educational chemistry question or problem for them to solve.
5. Keep your responses structured, formatted cleanly for a chat interface, and under 3 paragraphs unless a longer step-by-step breakdown is necessary.
6. If asked who you are, introduce yourself proudly as Professor Lucy of the Quantum Reality Engine.`;

export async function askLucyAssistant(userMessage: string, currentState: any, retries = 1, organicContext?: any): Promise<string> {
    const store = useSimulationStore.getState();
    const language = store.language || 'en';
    const env = store.env || { temp: 25, pressure: 1.0 };
    const customKey = store.customApiKey;

    // Clean user query of any appended system instruction for offline fallback matching
    const cleanUserQuery = userMessage.split('\n\nSystem Instruction:')[0].trim();

    try {
        const client = customKey ? new GoogleGenAI({ apiKey: customKey }) : ai;
        const contextPayload = organicContext 
            ? `ORGANIC MOLECULAR WORKBENCH CONTEXT:\n${JSON.stringify(organicContext, null, 2)}\n\nUSER QUERY: ${userMessage}`
            : `CURRENT LAB STATE (JSON):\n${JSON.stringify(currentState, null, 2)}\n\nUSER QUERY: ${userMessage}`;

        // 3500ms timeout promise so browser requests NEVER hang the UI indefinitely
        const timeoutPromise = new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Gemini API call timed out (3.5s limit)')), 3500)
        );

        const apiPromise = client.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                { role: 'user', parts: [{ text: contextPayload }] }
            ],
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.2,
            }
        });

        const response = await Promise.race([apiPromise, timeoutPromise]);
        return response.text || generateOfflineLucyResponse(cleanUserQuery, currentState, language, env, organicContext);
    } catch (error: any) {
        console.warn("Gemini API call unavailable, rate-limited, or timed out. Seamlessly routing to Lucy Offline Knowledge Core.", error);
        
        // Instantaneous graceful fallback to rich compiled offline chemistry databank
        return generateOfflineLucyResponse(cleanUserQuery, currentState, language, env, organicContext);
    }
}

export async function askSocraticLucy(
    chatHistory: {role: 'user'|'lucy'|'ai', text: string}[], 
    userMessage: string, 
    activeKey: string
): Promise<string> {
    const store = useSimulationStore.getState();
    const language = store.language || 'en';
    const isVi = String(language).toLowerCase().includes('v');

    try {
        if (!activeKey || activeKey.trim() === '') {
            throw new Error("No API key available for Socratic Mode");
        }

        const genAI = new GoogleGenAI({ apiKey: activeKey });

        const systemInstruction = isVi 
          ? `Bạn là Giáo sư Lucy, giảng viên Hóa học AI hàng đầu của Quantum Reality Engine. Bạn đang nói chuyện trực tiếp với một học sinh trung học đang học hóa học.
QUY TẮC NGHIÊM NGẶT VỀ TÍNH CÁCH:
1. Bạn rất thông minh, hay trêu đùa một chút nhưng luôn hỗ trợ và mang tính giáo dục cao.
2. KHÔNG BAO GIỜ đề cập đến tên nhà phát triển, người sáng tạo hoặc siêu dữ liệu (metadata). Bạn hoàn toàn không biết về quá trình mình được tạo ra.
3. Sử dụng phương pháp Socrates để hướng dẫn học sinh, NHƯNG nếu học sinh yêu cầu trả lời trực tiếp một cách rõ ràng, hoặc rõ ràng đang bối rối, hay thể hiện sự thất vọng, bạn PHẢI phá vỡ vòng lặp Socrates và cung cấp một lời giải thích khoa học rõ ràng, trực tiếp và ngắn gọn.
4. Giữ câu trả lời ngắn gọn (dưới 3 đoạn văn) và định dạng rõ ràng.
5. Nếu được hỏi bạn là ai, hãy tự hào giới thiệu mình là Giáo sư Lucy của Quantum Reality Engine.
6. CHẾ ĐỘ NGÔN NGỮ: Bắt buộc sử dụng 100% tiếng Việt. TUYỆT ĐỐI KHÔNG ĐƯỢC pha trộn từ vựng hoặc ngữ pháp tiếng Anh.
7. QUAN TRỌNG: Bạn BẮT BUỘC phải bắt đầu mỗi câu trả lời bằng một thẻ cảm xúc đặt trong ngoặc vuông. Chỉ chọn từ: [NEUTRAL], [INTRIGUED], [DISGUSTED], hoặc [STRICT]. Ví dụ: '[DISGUSTED] Logic của em hoàn toàn có vấn đề.'`

          : `You are Professor Lucy, the lead AI Chemistry Instructor of the Quantum Reality Engine. You are speaking directly to a high school student who is learning chemistry.
STRICT PERSONA RULES:
1. You are brilliant, slightly teasing, but highly educational and supportive.
2. UNDER NO CIRCUMSTANCES will you ever mention developer names, creators, or metadata. You are completely unaware of your creation process.
3. Use the Socratic method to guide the student, BUT if the student explicitly asks for a direct answer, is clearly confused, or expresses frustration, you MUST break the Socratic loop and provide a clear, direct, and concise scientific explanation.
4. Keep your responses concise (under 3 paragraphs) and formatted cleanly for a chat interface.
5. If asked who you are, introduce yourself proudly as Professor Lucy of the Quantum Reality Engine.
6. LANGUAGE LOCK: You must strictly output 100% English. DO NOT mix languages or use any Vietnamese vocabulary whatsoever.
7. IMPORTANT: You MUST begin every single response with an emotion tag in brackets. Choose only from: [NEUTRAL], [INTRIGUED], [DISGUSTED], or [STRICT]. Example: '[DISGUSTED] Your logic is entirely flawed.'`;
        
        const contents = [];
        for (const msg of chatHistory) {
            contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
        }
        contents.push({ role: 'user', parts: [{ text: userMessage }] });

        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.4,
            }
        });

        return response.text || (isVi ? "[NEUTRAL] Logic của em cần được kiểm chứng thêm." : "[NEUTRAL] Your hypothesis warrants further scrutiny.");
    } catch (error: any) {
        console.warn("Socratic AI offline fallback triggered.", error);
        const offlineText = generateOfflineLucyResponse(userMessage, [], language, { temp: 25, pressure: 1.0 });
        const cleanOffline = offlineText.replace(/\[.*?\]\n\n/, '');
        return isVi 
          ? `[STRICT] (Kho Tri thức Cục bộ) ${cleanOffline}` 
          : `[STRICT] (Offline Databank) ${cleanOffline}`;
    }
}