// types/pdf.ts

export interface Scaled {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
  pageNumber?: number;
}

export interface ScaledPosition {
  boundingRect: Scaled;
  rects: Scaled[];
  pageNumber: number;
  usePdfCoordinates?: boolean;
}

export interface LTWHP {
  left: number;
  top: number;
  width: number;
  height: number;
  pageNumber?: number;
}

export interface Position {
  boundingRect: LTWHP;
  rects: LTWHP[];
  pageNumber: number;
}

export interface HighlightContent {
  text?: string;
  image?: string;
}

export interface HighlightComment {
  text: string;
  emoji: string;
}

export interface CustomHighlight {
  content: HighlightContent;
  position: ScaledPosition;
  comment: HighlightComment;
  id: string;
  color: string;
}

export interface PdfViewerState {
  file: string | null;
  highlights: CustomHighlight[];
  isLoading: boolean;
  error: string | null;
}

export interface PdfViewerProps {
  onHighlightAdd?: (highlight: CustomHighlight) => void;
  onHighlightRemove?: (id: string) => void;
  initialHighlights?: CustomHighlight[];
}

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'red' | 'purple' | 'orange';

export interface HighlightAction {
  type: 'ADD' | 'REMOVE' | 'UPDATE';
  payload: CustomHighlight | string;
} 