# PDF Annotator
A single-page application (SPA) for uploading, viewing and Interacting with PDF files built with Next.js and deployed on Vercel.

## Features
- **Upload PDFs**: Drag-and-drop or click to upload PDF files.
- **View PDFs**: Displays the first page responsively (work in progress for full responsiveness).
- **Interact with pdf**: Underline, sign, add text to PDF(in progress)
- **Export Pdf**: Download pdf with changes made (in progress)
- **Deployment**: Live at https://pdf-annotator-application.vercel.app

## Tech Stack
- **Next.js**: Framework for SSR and client-side rendering.
- **react-pdf**: PDF rendering with `pdfjs-dist@5.0.375`.
- **react-dropzone**: File upload handling.
- **pdfjs-dist**: works with react-pdf as a worker to enable file upload
- **Tailwind CSS**: Responsive styling.

## Recent Improvements
- ✅ Fixed memory leaks and console logs
- ✅ Improved TypeScript types and error handling
- ✅ Added file validation (type and size)
- ✅ Enhanced responsive design
- ✅ Cross-platform build process for deployment
- ✅ Automatic PDF worker file management

## Installation (Local)
1. Clone the repo: `git clone https://github.com/Successinnovatia/pdf-annotator.git`
2. Install dependencies: `npm install`
3. Run: `npm run dev`

## Build Process
The build process automatically:
- Copies the PDF worker file from node_modules to public folder
- Works on both Windows and Linux (Vercel deployment)
- Includes fallback CDN worker if local file is unavailable

## Status
- Current: Basic upload and view functionality, partially responsive.
- Next Steps: Adding highlighting with `react-pdf-highlighter-extended@8.1.0` and export with `pdf-lib` post-submission due to time constraints.

## Notes
- Work will be completed within the next few hours as access to test was gotten today.

