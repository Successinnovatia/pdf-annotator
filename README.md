# PDF Annotator
A single-page application (SPA) for uploading, viewing and Interacting with PDF files built with Next.js and deployed on Vercel.

## Features
- **Upload PDFs**: Drag-and-drop or click to upload PDF files.
- **View PDFs**: Displays the first page responsively (work in progress for full responsiveness).
- **Interact with pdf**: Underline, sign, add text to PDF(in progress)
- **Export Pdf**: Download pdf with changes made (in progress)
- **Deployment**: Live at .

## Tech Stack
- **Next.js**: Framework for SSR and client-side rendering.
- **react-pdf**: PDF rendering with `pdfjs-dist@2.16.105`.
- **react-dropzone**: File upload handling.
- **pdfjs-dist**: works with react-pdf as a worker to enable file upload
- **Tailwind CSS**: Responsive styling.

## Challenges Encountered:
- Drag and drop was working untill i uploaded the pdf, and got the error No "GlobalWorkerOptions.workersrc specifies", tried some solutions from docs which didnt work out but finally came up with the solution of installing pdfjs-dist and copying the worker file from node modules to the public folder, then declaring the file in my homepage.

## Status
- Current: Basic upload and view functionality, partially responsive.
- Next Steps: Adding highlighting with `react-pdf-highlighter-extended@8.1.0` and export with `pdf-lib` post-submission due to time constraints.

## Installation (Local)
1. Clone the repo: `git clone https://github.com/Successinnovatia/pdf-annotator.git`
2. Install dependencies: `npm install`
3. Copy worker to public folder: `cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/`
4. Run: `npm run dev`

## Notes
- Work will be completed within the next few hours as access to test was gotten today.

