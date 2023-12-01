import { Color } from './../types';

const FONT_SIZE = 16;

const colors: Record<Color, string> = {
  green: '#0ea60e',
  red: '#de350b',
};

export const generateImage = (version: string, color: Color) => {
  const width = (version.length * FONT_SIZE) / 1.7;
  const height = FONT_SIZE * 1.3;

  const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect x="0" y="0" width="${width}" height="${height}" rx="${
          FONT_SIZE / 2
        }" fill="${color}" />
        <text x="${
          width / 2
        }" y="${FONT_SIZE}" font-weight="bold" font-size="${FONT_SIZE}px" font-family="Arial" text-anchor="middle" fill="white">${version}</text>
      </svg>
    `;

  return svgContent;
};
