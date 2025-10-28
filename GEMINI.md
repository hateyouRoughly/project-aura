# Project Aura: AI Web Co-Pilot

## Project Overview

This repository contains the codebase for "Project Aura," an AI-powered web automation co-pilot. The project is built on Next.js, using TypeScript for the frontend and backend. The backend is designed with a modular architecture, leveraging several key design patterns to ensure scalability and maintainability.

*   **Core Technologies:** Next.js, TypeScript, Playwright, MongoDB (with Mongoose)
*   **Styling:** Tailwind CSS
*   **Linting:** ESLint

## Backend Architecture

The backend follows a sophisticated, pattern-driven architecture to decouple concerns and enhance testability.

*   **Facade Pattern:** The `AutomationFacade` (`src/lib/facade`) provides a simplified, single entry point for initiating automation jobs from the client.
*   **Observer Pattern:** The `JobStatusNotifier` and `WebSocketManager` (`src/lib/job`) provide real-time updates on job progress to the client.
*   **Factory Pattern:** The `BrowserAgentFactory` (`src/lib/browser`) decouples the system from the specific browser automation tool (Playwright) by providing a consistent interface for creating browser agents.
*   **Strategy Pattern:** The `AIInterpreter` (`src/lib/ai`) uses the strategy pattern with `IAIModelStrategy` to allow for different AI models (e.g., Gemini, Claude) to be used interchangeably for action generation.
*   **Command Pattern:** Actions like clicking and typing are encapsulated as command objects (`ClickCommand`, `TypeCommand` in `src/lib/execution`) that implement the `IActionCommand` interface. This makes the actions easy to execute, log, and extend.

## Data Model

The application uses MongoDB for data persistence, with Mongoose for object data modeling. The schemas are defined in `src/lib/db/models`.

*   **Users:** Stores user information.
*   **Credentials:** Securely stores encrypted user credentials for websites.
*   **AutomationJobs:** Represents a single automation task, including its goal, status, and timing information.
*   **AuditLogs:** Records a detailed log of every action performed within an `AutomationJob` for traceability and debugging.

## Core Automation Flow

1.  The client sends a request to the `AutomationFacade` to start a job.
2.  The facade creates a new `AutomationJob` record in the database.
3.  The `JobProcessor` is invoked, which uses the `BrowserAgentFactory` to launch a new browser instance.
4.  The processor enters a loop, capturing the state of the web page on each iteration.
5.  The `AIInterpreter` (using a specific `Strategy`) analyzes the state and the user's goal to determine the next `IActionCommand`.
6.  The `ExecutionManager` executes the command.
7.  The `JobStatusNotifier` sends updates to the client via WebSockets.
8.  The loop continues until the AI determines the task is complete.

## Building and Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Configure Environment:** Create a `.env.local` file and add your `MONGODB_URI`.
3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
4.  **Build for Production:**
    ```bash
    npm run build
    ```
5.  **Lint the Code:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **TypeScript:** All new code should be in TypeScript.
*   **Backend Structure:** The backend logic is organized by feature and pattern in the `src/lib` directory (`facade`, `job`, `browser`, `ai`, `execution`).
*   **Path Aliases:** The project uses the path alias `@/*` to refer to the `src` directory.
