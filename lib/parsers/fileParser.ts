import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import type { Buffer } from "buffer";

export async function extractTextFromBuffer(buffer: Buffer, mimeType: string): Promise<string> {
    if (mimeType === "application/pdf") {
        try {
          const result = await pdfParse(buffer); 
          return result.text.trim();
        } catch (err) {
          console.error("❌ PDF parsing failed:", err);
          throw err;
        }
      }

  if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const result = await mammoth.extractRawText({ buffer });
  
    console.log("📄 Extracted DOCX text:", result.value); 
  
    return result.value;
  }
  if (mimeType === "text/plain") {
    return buffer.toString("utf-8");
  }

  throw new Error("Unsupported file type");
}