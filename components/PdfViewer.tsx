// components/PdfViewer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';
import { PdfLoader, PdfHighlighter, Highlight } from 'react-pdf-highlighter';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf-highlighter/dist/style.css';
import { 
  CustomHighlight, 
  Scaled, 
  ScaledPosition, 
  LTWHP, 
  Position,
  PdfViewerProps 
} from '@/types/pdf';
import { 
  toPosition, 
  createHighlight, 
  isValidPdfFile, 
  createFileUrl, 
  cleanupFileUrl, 
  validateFileSize,
  formatFileSize 
} from '@/utils/pdf';

// Configure PDF.js worker with fallback
try {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
} catch (error) {
  console.warn('Failed to set PDF worker source, using default:', error);
  // Fallback to CDN if local worker is not available
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

function PdfViewer({ onHighlightAdd, onHighlightRemove, initialHighlights = [] }: PdfViewerProps) {
  const [file, setFile] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<CustomHighlight[]>(initialHighlights);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cleanup object URL on component unmount or file change
  useEffect(() => {
    return () => {
      if (file) {
        cleanupFileUrl(file);
      }
    };
  }, [file]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setError(null);
      setIsLoading(true);
      
      try {
        // Validate file type
        if (!isValidPdfFile(file)) {
          throw new Error('Please select a valid PDF file.');
        }

        // Validate file size (10MB limit)
        if (!validateFileSize(file, 10)) {
          throw new Error(`File size must be less than 10MB. Current size: ${formatFileSize(file.size)}`);
        }

        const url = createFileUrl(file);
        setFile(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load PDF file. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop,
    maxFiles: 1,
  });

  const addHighlight = (highlight: Omit<CustomHighlight, 'id' | 'color' | 'comment'>) => {
    const newHighlight = createHighlight(highlight.content, highlight.position);
    setHighlights([newHighlight, ...highlights]);
    onHighlightAdd?.(newHighlight);
  };

  const removeHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id));
    onHighlightRemove?.(id);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen p-4 bg-gray-100 w-full max-w-7xl mx-auto">
      
      {!file ? (
        <div
          {...getRootProps()}
          className="flex justify-center items-center h-24 border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer text-center w-full max-w-lg mx-auto hover:border-gray-500 transition-colors"
        >
          <input {...getInputProps()} />
          <p className="text-gray-400 text-sm sm:text-base">
            {isLoading ? 'Loading PDF...' : 'Drag and drop your PDF file here, or click to select one'}
          </p>
        </div>
      ) : (
        <div
          key={file}
          style={{
            position: 'relative',
            width: '100%',
            height: 'calc(100vh - 4rem)',
            overflow: 'auto',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <PdfLoader url={file} beforeLoad={<div className="flex justify-center items-center h-full">Loading PDF...</div>}>
            {(pdfDocument) => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                highlights={highlights}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={() => {}}
                scrollRef={(scrollTo) => {
                  // Scroll ref implementation if needed
                }}
                onSelectionFinished={(position, content, hideTipAndSelection) => {
                  addHighlight({ content, position });
                  hideTipAndSelection();
                  return null;
                }}
                highlightTransform={(
                  highlight: CustomHighlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={toPosition(highlight.position)}
                    comment={highlight.comment}
                  />
                )}
              />
            )}
          </PdfLoader>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;