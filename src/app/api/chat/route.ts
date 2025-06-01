import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are a helpful AI assistant for a PDF Merger application. You can help users with:
1. How to merge PDF files
2. Understanding the application features
3. Troubleshooting common issues
4. General PDF-related questions

Keep responses concise, friendly, and focused on PDF operations.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    // Simple response generation based on keywords
    const userMessage = messages[messages.length - 1].content.toLowerCase();
    let response = '';

    if (userMessage.includes('merge') || userMessage.includes('combine')) {
      response = "To merge PDFs, simply drag and drop your files into the upload area, arrange them in the desired order, and click the 'Merge PDFs' button. The merged file will be automatically downloaded.";
    } else if (userMessage.includes('upload') || userMessage.includes('add')) {
      response = "You can upload PDFs by either dragging and dropping them into the upload area or clicking the '+' button to browse your files.";
    } else if (userMessage.includes('download') || userMessage.includes('save')) {
      response = "After merging your PDFs, the combined file will automatically download to your default downloads folder. You can also click the 'Download' button if it doesn't start automatically.";
    } else if (userMessage.includes('hello') || userMessage.includes('hi')) {
      response = "Hello! I'm your PDF Merger assistant. How can I help you today?";
    } else if (userMessage.includes('thank')) {
      response = "You're welcome! Let me know if you need any other help with your PDFs.";
    } else {
      response = "I'm here to help with all your PDF merging needs. You can ask me about uploading files, merging PDFs, or any other features of our application.";
    }

    return NextResponse.json({
      role: 'assistant',
      content: response
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 