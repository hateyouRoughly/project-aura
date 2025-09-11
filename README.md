# Aura - The AI-Powered Web Co-Pilot

**Version: 1.1**

Aura is an intelligent, user-driven web automation platform designed to translate natural language instructions into direct browser actions. It empowers any user to delegate complex digital tasks to a reliable AI co-pilot, regardless of their technical expertise.

## 1. Problem Statement

Web automation has traditionally been a high-barrier field, demanding specialized knowledge of programming and frameworks like Playwright or Selenium. This excludes the vast majority of users who perform repetitive, manual, and time-consuming tasks. Existing "no-code" tools are often rigid and break easily with website UI updates.

Complex enterprise platforms with dynamically generated UIs, such as **ServiceNow's UI Builder**, present significant challenges for traditional automation, as selectors are often obfuscated or change frequently. Aura addresses this by perceiving and interacting with web pages visually, much like a human operator.

## 2. Vision & Goals

**Vision:** To democratize web automation, enabling anyone to offload their digital workflows to a reliable AI.

**Project Goals:**

* **Natural Language Tasking:** Accept and accurately interpret complex, multi-step instructions in plain English.
* **Real-Time Visual Feedback:** Provide a high-fidelity, streaming "co-pilot" view of the automated browser session.
* **User-Controlled AI:** Empower users to bring their own Gemini API key and select their preferred model.
* **Secure & Non-Custodial:** Ensure user privacy by never storing API keys and handling them only in-memory per session.

## 3. Core Features

* **Control Panel:** An intuitive interface for your Gemini API Key, model selection, and natural language task input.
* **Co-Pilot View:** A large, real-time stream of screenshots from the server-side browser, showing you exactly what the AI is doing.
* **AI Action Log:** A running log that narrates the AI's decision-making process (e.g., "Analyzing page for 'login button'", "Decision: Click on element `button[data-testid='login']`").
* **Powerful Automation Engine:** Utilizes Playwright to run isolated Chromium instances, capturing page state (screenshots, DOM) and executing actions with precision.
* **Multimodal AI:** Constructs a detailed prompt for Google Gemini, including the user's goal, the current screenshot, and the page's DOM, enabling human-like interaction.

## 4. Technical Architecture

Aura is built with a modern, real-time web stack:

* **Backend:** A custom Node.js server running alongside a Next.js application.
* **Real-time Communication:** WebSockets (socket.io) for pushing live updates from the server to the client.
* **Browser Automation:** Playwright for launching and controlling sandboxed Chromium browser instances.
* **AI Integration:** The Google Gemini API is used for multimodal analysis, with the client dynamically initialized using the user-provided API key.
* **Frontend:** Built with React and Next.js for a responsive and interactive user experience.

## 5. Installation and Setup

Follow these steps to get a local instance of Aura running.

**Prerequisites:**

* Node.js (v18 or later recommended)
* npm, yarn, or pnpm

**Instructions:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/aura.git
    cd aura
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Install Playwright browsers:**
    The first time you install, you'll also need to download the browser binaries Playwright uses.
    ```bash
    npx playwright install
    ```

4.  **Set up environment variables:**
    Aura operates on a "Bring Your Own Key" model, so no `.env` file is strictly required to run the application itself. Users will input their key in the UI.

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6.  **Open the application:**
    Navigate to `http://localhost:3000` in your browser. You can now enter your Google Gemini API key, select a model, provide a task, and start automating!

## 6. Security Considerations

* **API Key Handling:** Your Gemini API key is sent over HTTPS and is **never stored on our servers**. It is held only in memory for the duration of a single automation job and is discarded immediately after.
* **Browser Sandboxing:** Each Playwright instance runs in a completely isolated environment to prevent cross-session interference.

## 7. Future Roadmap

* **Phase 1 (MVP):** Current implementation.
* **Phase 2 (Enhancements):** Session history, macros, support for file uploads, and advanced error recovery.
* **Phase 3 (Expansion):** A Chrome Extension for easy activation and team collaboration features.
