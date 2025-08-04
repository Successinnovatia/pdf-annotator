// utils/pdf.ts

import { Scaled, LTWHP, ScaledPosition, Position, CustomHighlight, HighlightColor } from '@/types/pdf';

/**
 * Generates a unique ID for highlights
 */
export const getNextId = (): string => String(Math.random()).slice(2);

/**
 * Converts scaled coordinates to LTWHP format
 */
export const toLTWHP = (scaled: Scaled): LTWHP => ({
  left: scaled.x1,
  top: scaled.y1,
  width: scaled.width,
  height: scaled.height,
  pageNumber: scaled.pageNumber,
});

/**
 * Converts scaled position to regular position format
 */
export const toPosition = (scaledPosition: ScaledPosition): Position => ({
  boundingRect: toLTWHP(scaledPosition.boundingRect),
  rects: scaledPosition.rects.map(toLTWHP),
  pageNumber: scaledPosition.pageNumber,
});

/**
 * Creates a new highlight with default values
 */
export const createHighlight = (
  content: { text?: string; image?: string },
  position: ScaledPosition,
  color: HighlightColor = 'yellow'
): CustomHighlight => ({
  content,
  position,
  id: getNextId(),
  color,
  comment: { text: '', emoji: '' },
});

/**
 * Validates if a file is a PDF
 */
export const isValidPdfFile = (file: File): boolean => {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
};

/**
 * Creates an object URL for a file with error handling
 */
export const createFileUrl = (file: File): string => {
  try {
    return URL.createObjectURL(file);
  } catch (error) {
    throw new Error('Failed to create file URL');
  }
};

/**
 * Cleans up object URLs to prevent memory leaks
 */
export const cleanupFileUrl = (url: string): void => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

/**
 * Formats file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validates PDF file size (max 10MB)
 */
export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}; 