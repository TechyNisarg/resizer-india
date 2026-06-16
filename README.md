# Resizer India

A 100% secure, fully client-side image resizing and compression utility designed specifically for Indian government forms and exams.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://resizer-india.vercel.app/)

## Features

- **100% Client-Side**: All cropping, resizing, and compression happens entirely in the browser using Web Workers. Images never leave your device.
- **Precision Compression**: Intelligently compresses images to hit strict file size limits (e.g., 10KB - 50KB) often required by government portals.
- **Exam & Document Presets**: 1-click presets with exact pixel dimensions and KB requirements for:
  - PAN Card
  - RTO / Parivahan
  - SSC, UPSC, IBPS, RRB, NEET
  - State PSCs and more
- **Modern UI**: Clean, responsive interface built with React, Vite, and Framer Motion.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Processing**: `react-easy-crop` (Cropping) + HTML5 Canvas API (Resizing & Compression)
- **Deployment**: Vercel (Static Export + Prerendering)

## Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production (includes static prerendering)
npm run build
```
