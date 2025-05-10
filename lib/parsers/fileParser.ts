import mammoth from "mammoth";
import { Buffer } from "buffer";

export async function extractTextFromBuffer(buffer: Buffer, mimeType: string): Promise<string> {
  console.log("📥 Starting text extraction for MIME type:", mimeType);

  if (mimeType === "application/pdf") {
    console.log("📄 Detected PDF file. Parsing...");

    const pdfParse = await import("pdf-parse/lib/pdf-parse.js").then((mod) => mod.default);

    if (!buffer || !Buffer.isBuffer(buffer) || buffer.length === 0) {
      throw new Error("Invalid or empty buffer passed to pdf-parse");
    }

    try {
      const result = await pdfParse(buffer);
      console.log("✅ PDF text extracted. Length:", result.text.length);
      return result.text;
    } catch (error) {
      console.error("❌ Failed to extract PDF text:", error);
      throw error;
    }
  }

  if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const result = await mammoth.extractRawText({ buffer });
    console.log("📄 Extracted DOCX text:", result.value);
    return result.value;
  }

  if (mimeType === "text/plain") {
    const text = buffer.toString("utf-8");
    console.log("📄 Extracted TXT text:", text);
    return text;
  }

  throw new Error("Unsupported file type");
}