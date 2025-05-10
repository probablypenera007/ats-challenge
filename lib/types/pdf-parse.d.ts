declare module "pdf-parse/lib/pdf-parse.js" {
  import { Buffer } from "buffer";

  interface PDFPage {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: Record<string, any>;
    version: string;
  }

  export default function parsePDF(data: Buffer): Promise<PDFPage>;
}