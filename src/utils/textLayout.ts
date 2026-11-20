
import type { StaticTextElement } from "../types/element.types";

interface TextLayoutOptions {
  text: string;
  width: number;
  fontSize: number;
  fontFamily: string;
  fontStyle: StaticTextElement["fontStyle"];
  lineHeight: number;
  wrap: StaticTextElement["wrap"];
}

export function calculateTextHeight({
  text,
  width,
  fontSize,
  fontFamily,
  fontStyle,
  lineHeight,
  wrap,
}: TextLayoutOptions): number {
  if (typeof window === "undefined") {
    return fontSize * lineHeight;
  }

  const canvas = window.document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return fontSize * lineHeight;
  }

  const isBold = fontStyle.includes("bold");
  const isItalic = fontStyle.includes("italic");

  context.font = [
    isItalic ? "italic" : "normal",
    isBold ? "bold" : "normal",
    `${fontSize}px`,
    fontFamily,
  ].join(" ");

  const availableWidth = Math.max(1, width);
  const lineTexts: string[] = [];

  const measure = (value: string) =>
    context.measureText(value).width;

  const addWordWrappedParagraph = (paragraph: string) => {
    if (!paragraph) {
      lineTexts.push("");
      return;
    }

    const words = paragraph.split(/\s+/);
    let currentLine = "";

    for (const word of words) {
      const candidate = currentLine
        ? `${currentLine} ${word}`
        : word;

      if (measure(candidate) <= availableWidth) {
        currentLine = candidate;
        continue;
      }

      if (currentLine) {
        lineTexts.push(currentLine);
        currentLine = "";
      }

      if (wrap === "char" && measure(word) > availableWidth) {
        let currentPart = "";

        for (const character of word) {
          const candidatePart = currentPart + character;

          if (
            currentPart &&
            measure(candidatePart) > availableWidth
          ) {
            lineTexts.push(currentPart);
            currentPart = character;
          } else {
            currentPart = candidatePart;
          }
        }

        currentLine = currentPart;
      } else {
        currentLine = word;
      }
    }

    if (currentLine) {
      lineTexts.push(currentLine);
    }
  };

  // Preserve intentional newline characters.
  for (const paragraph of text.split("\n")) {
    addWordWrappedParagraph(paragraph);
  }

  const lineCount = Math.max(1, lineTexts.length);

  // A small safety allowance prevents clipping caused by font metrics.
  return Math.ceil(lineCount * fontSize * lineHeight + 2);
}