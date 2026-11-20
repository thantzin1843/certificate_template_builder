import type { CanvasElement } from "./element.types";

export type PageOrientation = "landscape" | "portrait";

export type PagePreset =
  | "A4"
  | "A5"
  | "CUSTOM";

export interface CanvasDocument {
  width: number;
  height: number;
  preset: PagePreset;
  orientation: PageOrientation;
  background: string;
}

export interface EditorState {
  // Document
  document: CanvasDocument;

  // Viewport
  zoom: number;

  // Elements
  elements: CanvasElement[];

  // Selection
  selectedElementId: string | null;

  // Document actions
  setDocument: (document: CanvasDocument) => void;

  // Zoom actions
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;

  // Element actions
  addTextElement: () => void;

  selectElement: (id: string | null) => void;

  updateElement: (
    id: string,
    updates: Partial<CanvasElement>
  ) => void;

  deleteElement: (id: string) => void;

  moveElement: (
  id: string,
  x: number,
  y: number
) => void;
}