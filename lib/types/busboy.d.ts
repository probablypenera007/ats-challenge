declare module 'busboy' {
  import { Readable } from 'stream';

  interface BusboyConfig {
    headers: Record<string, string>;
  }

  interface FileInfo {
    filename: string;
    encoding: string;
    mimeType: string;
  }

  class Busboy extends Readable {
    constructor(config: BusboyConfig);
    on(event: 'field', listener: (name: string, value: string) => void): this;
    on(event: 'file', listener: (fieldname: string, file: Readable, info: FileInfo) => void): this;
    on(event: 'finish', listener: () => void): this;
  }

  export = Busboy;
} 