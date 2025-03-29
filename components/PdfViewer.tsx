
'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

function PdfViewer() {
  const [file, setFile] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop,
  });

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      {!file ? (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer text-center w-full max-w-lg sm:max-w-md md:max-w-sm lg:max-w-md"
        >
          <input {...getInputProps()} />
          <p className="text-gray-400 text-sm sm:text-base">
            Drag and drop your PDF file here, or click to select one
          </p>
        </div>
      ) : (
        <div className="mt-4 border border-gray-300 shadow-lg w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl overflow-x-auto">
          <Document file={file}>
            <Page
              pageNumber={1}
              width={Math.min(800, window.innerWidth - 40)} 
              className="mx-auto"
            />
          </Document>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;