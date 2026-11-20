
import type {
  CanvasDocument,
  PageOrientation,
  PagePreset,
} from "../types/editor.types";

export const PAGE_PRESETS: Record<
  PagePreset,
  {
    width: number;
    height: number;
  }
> = {
  A4: {
    width: 1123,
    height: 794,
  },

  A5: {
    width: 794,
    height: 559,
  },

  CUSTOM: {
    width: 1123,
    height: 794,
  },
};

export const DEFAULT_DOCUMENT: CanvasDocument = {
  width: 1123,
  height: 794,
  preset: "A4",
  orientation: "landscape",
  background: "#ffffff",
};

export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 2;
export const ZOOM_STEP = 0.1;

export function createDocument(
  preset: PagePreset,
  orientation: PageOrientation
): CanvasDocument {
  const dimensions = PAGE_PRESETS[preset];

  const isLandscape = orientation === "landscape";

  return {
    width: isLandscape
      ? dimensions.width
      : dimensions.height,

    height: isLandscape
      ? dimensions.height
      : dimensions.width,

    preset,
    orientation,
    background: "#ffffff",
  };
}