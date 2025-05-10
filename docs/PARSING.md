# CV & Job Description Parsing Strategy

## Overview

This application supports intelligent parsing of both: 
-   Job Descriptions
-   Candidate CVs (.pdf, .docx, or .txt)

The parsed content is fused and passed into the AI API for tailored question generation.


## Job Description
Job descriptions are provided via a controlled text input field. We:

Ensure the input is sufficiently detailed (with min-length validation)

Send the text as-is for AI processing (no transformation required)

The input is managed in useInterviewForm.ts and passed to the backend via FormData.


## CV File Upload Flow
### UI Layer
In CVUploader.tsx, candidates can upload supported file formats:
.pdf
.docx
.txt
The uploaded file is captured via <input type="file"> and managed in React state (cvFile)


## Backend Handling

When the user submits the form:

- The frontend calls POST /api/save-session

- The server uses Busboy to parse the multipart form data

busboy.d.ts

We use a custom .d.ts file to type Busboy, a Node.js streaming parser that:

- Extracts the jobDescription field

- Streams the uploaded file into a Buffer


## File Parsing Logic

Located in lib/parsers/fileParser.ts, we detect the MIME type and:

1. PDF Files

- Handled by pdf-parse (typed via pdf-parse.d.ts)

Extracts all page text

2. DOCX Files

- Handled by mammoth

- Extracts raw text (no styles/tables)

3. TXT Files
Converts the buffer directly to UTF-8 string


## Sample Flow

1. User uploads resume.pdf

2. File is streamed via Busboy to the backend

3. MIME type detected: application/pdf

4. File buffer is passed to extractTextFromBuffer()

5. Text content is extracted using pdf-parse

6. Text is saved to MongoDB and used for AI prompts



## Why We Do This

- **Consistency**: Ensures the AI receives uniform, analyzable plain text regardless of original format.
- **Flexibility**: Allows candidates to upload commonly used CV formats.
- **Security**: Files are streamed and processed in memory — never saved to disk.
- **Persistence**: Parsed results are stored in MongoDB, allowing reuse in scoring and follow-up prompts.
