# Project Aura: AI Web Co-Pilot

## Project Overview

This is a Next.js and React project that serves as a showcase and landing page for "Project Aura". Aura is an AI-powered web automation platform that uses natural language to perform browser-based tasks. The project is built with TypeScript and styled with Tailwind CSS. It features a responsive design with a dark theme and various interactive elements.

The core technologies used are:

*   **Frontend:** Next.js, React, TypeScript
*   **Styling:** Tailwind CSS
*   **Linting:** ESLint

The project is structured as a standard Next.js application with the main page at `src/app/page.tsx` and the layout at `src/app/layout.tsx`.

## Building and Running

To get the project up and running, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the development server at `http://localhost:3000`.

3.  **Build for Production:**
    ```bash
    npm run build
    ```
    This will create a production-ready build in the `.next` directory.

4.  **Start the Production Server:**
    ```bash
    npm run start
    ```
    This will start the production server.

5.  **Lint the Code:**
    ```bash
    npm run lint
    ```
    This will run ESLint to check for any code quality issues.

## Development Conventions

*   **TypeScript:** The project is written in TypeScript, and all new code should be as well.
*   **Styling:** Tailwind CSS is used for styling. Utility-first classes are preferred.
*   **Components:** The main page is composed of several React components, such as `NavLink`, `FeatureCard`, and `VideoPlayer`. New UI elements should be created as reusable components where appropriate.
*   **Linting:** The project uses ESLint with the `eslint-config-next` configuration. All code should adhere to the linting rules.
*   **Path Aliases:** The project uses the path alias `@/*` to refer to the `src` directory.
