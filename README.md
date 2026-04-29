# Invisible Cities

An AI-powered isometric exploration of imaginary urban architecture, inspired by Italo Calvino's masterpiece.

![Invisible Cities Header](https://images.unsplash.com/photo-1449156001437-3a16b1da8394?q=80&w=2070&auto=format&fit=crop)

## 🏛️ Project Overview

**Invisible Cities** is a digital atlas that brings to life the impossible geometries described by Marco Polo to Kublai Khan in Italo Calvino's novel. The application serves as a bridge between high literature and generative AI, transmuting poetic descriptions into visual "etchings" that capture the soulful, often paradoxical nature of these imaginary places.

Each city is rendered using **Gemini AI**, following a specific visual grammar: high-contrast, M.C. Escher-inspired axonometric etchings that emphasize the relationship between memory, desire, and geometry.

## ✨ Key Features

-   **Literary Atlas**: Navigate through 8 distinct cities from the book, including Zaira, Armilla, and Ersilia.
-   **AI Conjuration**: "Reveal" each city through AI-generated illustrations. Each generation is unique, reflecting the specific visual prompts derived from Calvino's text.
-   **Atmospheric Design**: A bespoke UI crafted with an "analog" aesthetic, featuring paper textures, refined typography (Cinzel & Cormorant Garamond), and cinematic transitions.
-   **Mobile Explorer**: A fully responsive experience, allowing you to explore the invisible from any device.

## 🛠️ Tech Stack

-   **Framework**: [React 19](https://react.dev/)
-   **Tooling**: [Vite](https://vitejs.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Engine**: [Google Gemini AI (Generative Images)](https://ai.google.dev/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

You will need a Google Gemini API Key. You can obtain one at the [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  Clone the repository or download the source.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables by creating a `.env` file in the root:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### Development

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 📜 Included Cities

-   **Zaira**: The city of high bastions where the past is soaked up like a sponge.
-   **Armilla**: A city with no walls or floors, only a vertical forest of plumbing.
-   **Zobeide**: The white city wound about itself like a skein of yarn.
-   **Moriana**: A city with two faces, as thin as a sheet of paper.
-   **Ersilia**: Where relationships are established by networks of white and black strings.
-   **Thekla**: The city under eternal construction, guided by the constellations.
-   **Argia**: The subterranean city where streets are filled with earth.
-   **Olinda**: The city that grows in concentric circles, starting from a microscopic point.

---

*"Traveling, you realize that differences are lost: each city takes to resembling all cities..."*
