
export type ElementType = "static-text";

export interface StaticTextElement {
  id: string;
  type: "static-text";

  // Position on the certificate
  x: number;
  y: number;

  // Text content
  text: string;

  // Text box dimensions
  width: number;
  height: number;

  // Typography
  fontSize: number;
  fontFamily: string;
  fontStyle: "normal" | "bold" | "italic" | "bold italic";
  textDecoration: "none" | "underline";

  // Appearance
  fill: string;

  // Text layout
  align: "left" | "center" | "right";
  lineHeight: number;
  wrap: "word" | "char";
}
  
export type CanvasElement = StaticTextElement;