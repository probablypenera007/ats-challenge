declare module "pdf-parse" {
    import { Buffer } from "buffer";
  
    interface PDFParseResult {
      numpages: number;
      numrender: number;
      info: object;
      metadata: any;
      text: string;
      version: string;
    }
  
    function pdfParse(dataBuffer: Buffer): Promise<PDFParseResult>;
  
    export default pdfParse;
  }