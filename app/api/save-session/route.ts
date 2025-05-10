import { NextRequest, NextResponse } from "next/server";
import { Readable, Writable } from "stream";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createBusboy = require("busboy");
import { extractTextFromBuffer } from "@/lib/parsers/fileParser";
import { connectToDB } from "@/lib/mongodb/connect";
import InterviewSession from "@/models/interviewSession";

export const config = {
  api: { bodyParser: false },
};

function bufferFromStream(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const reqBuffer = Buffer.from(await req.arrayBuffer());
  const reqStream = Readable.from(reqBuffer);

  return new Promise((resolve) => {
    const busboy = createBusboy({
      headers: Object.fromEntries(req.headers.entries()),
    });

    let jobDescription = "";
    let extractedText = "";
    let fileHandled = false;
    let fileParsePromise: Promise<void> | null = null;

    busboy.on("field", (name: string, value: string) => {
      if (name === "jobDescription") jobDescription = value;
    });

    busboy.on(
      "file",
      (_fieldname: string, file: Readable, info: { filename: string; encoding: string; mimeType: string }) => {
        fileHandled = true;

        fileParsePromise = (async () => {
          try {
            const buffer = await bufferFromStream(file);
            extractedText = await extractTextFromBuffer(buffer, info.mimeType);
            console.log("📄 Extracted text preview:", extractedText.slice(0, 200));
          } catch (error) {
            console.error("❌ File parsing error:", error);
          }
        })();
      }
    );

    busboy.on("finish", async () => {
      if (!fileHandled) {
        return resolve(
          NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 })
        );
      }

      if (fileParsePromise) await fileParsePromise;

      try {
        await connectToDB();
        const saved = await InterviewSession.create({
          jobDescription,
          cvText: extractedText,
        });
        return resolve(NextResponse.json({ success: true, sessionId: saved._id }));
      } catch (error) {
        console.error("❌ DB Error:", error);
        return resolve(
          NextResponse.json({ success: false, error: "Database error" }, { status: 500 })
        );
      }
    });

    reqStream.pipe(busboy as unknown as Writable);
  });
}