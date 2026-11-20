import { create } from "zustand";

import { calculateTextHeight } from "../utils/textLayout";
import type { EditorState } from "../types/editor.types";
import type { StaticTextElement } from "../types/element.types";

import {
  DEFAULT_DOCUMENT,
  MIN_ZOOM,
  MAX_ZOOM,
  ZOOM_STEP,
} from "../constants/canvas.constants";

function createTextElement(
  id: string,
  x: number,
  y: number
): StaticTextElement {
  return {
    id,
    type: "static-text",

    x,
    y,

    text: "Double-click to edit",

    width: 400,
    height: 100,

    fontSize: 32,
    fontFamily: "Arial",
    fontStyle: "bold",
    textDecoration: "none",

    fill: "#222222",

    align: "center",
    lineHeight: 1.2,
    wrap: "word",
    letterSpacing: 0,
    rotation: 0
  };
}

export const useEditorStore = create<EditorState>((set, get) => ({
  document: DEFAULT_DOCUMENT,

  zoom: 0.7,

  elements: [],

  selectedElementId: null,

  // Document actions
  setDocument: (document) => {
    set({ document });
  },

  // Zoom actions
  setZoom: (zoom) => {
    const safeZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));

    set({ zoom: safeZoom });
  },

  zoomIn: () => {
    const currentZoom = get().zoom;

    get().setZoom(Math.round((currentZoom + ZOOM_STEP) * 100) / 100);
  },

  zoomOut: () => {
    const currentZoom = get().zoom;

    get().setZoom(Math.round((currentZoom - ZOOM_STEP) * 100) / 100);
  },

  resetZoom: () => {
    get().setZoom(0.7);
  },

  // Element actions
  addTextElement: () => {
    const { document, elements } = get();

    const id = crypto.randomUUID();

    const width = 400;
    const height = 100;

    const x = (document.width - width) / 2;
    const y = (document.height - height) / 2;

    const newElement = createTextElement(id, x, y);

    set({
      elements: [...elements, newElement],
      selectedElementId: id,
    });
  },

  selectElement: (id) => {
    set({
      selectedElementId: id,
    });
  },


updateElement: (id, updates) => {
  set((state) => ({
    elements: state.elements.map((element) => {
      if (element.id !== id) {
        return element;
      }

      const updatedElement = {
        ...element,
        ...updates,
      };

      if (updatedElement.type === "static-text") {
        updatedElement.height = calculateTextHeight({
          text: updatedElement.text,
          width: updatedElement.width,
          fontSize: updatedElement.fontSize,
          fontFamily: updatedElement.fontFamily,
          fontStyle: updatedElement.fontStyle,
          lineHeight: updatedElement.lineHeight,
          wrap: updatedElement.wrap,
          letterSpacing: updatedElement.letterSpacing,
        });
      }

      return updatedElement;
    }),
  }));
},

  deleteElement: (id) => {
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),

      selectedElementId:
        state.selectedElementId === id ? null : state.selectedElementId,
    }));
  },

  moveElement: (id, x, y) => {
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id
          ? {
              ...element,
              x,
              y,
            }
          : element
      ),
    }));
  },
}));
