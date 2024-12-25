# Memopin - AI-Enhanced Memory Recall Tool (Frontend)

## Project Description

Memopin is an AI-enhanced memory recall tool designed to address the challenges of fragmented memories and forgetfulness in the digital age. People often struggle to recall meaningful moments as photos, conversations, and videos are scattered across various platforms, making retrieval difficult. For individuals with Alzheimer's and other memory impairments, this struggle becomes even more pronounced, leading to confusion, disorientation, and emotional distress.

Memopin solves these challenges by providing a unified platform to store and retrieve key moments. Using advanced AI technologies like Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), and Natural Language Processing (NLP), it helps users retrieve detailed, context-rich memories from multimedia content like audio, video, and photos. Memopin's video analysis adds an extra layer of depth to memory recall, ensuring a comprehensive understanding of multimedia content.

The solution organizes memories into a searchable, context-aware database, making it easy to reflect on past experiences and improve cognitive health, emotional well-being, and memory management.

## Tech Stack

- **React**: Frontend framework for building the user interface and managing user interactions.
- **ReactDOM**: Renders the React components in the browser.
- **NLP (Natural Language Processing)**: Analyzes speech and text within recorded content to enhance memory context and improve relevance.
- **Retrieval-Augmented Generation (RAG) AI**: Combines memory storage and querying to generate contextually accurate responses to user queries.
- **Large Language Models (LLMs)**: Understands and contextualizes user queries, offering detailed and relevant memories reflecting personal experiences.
- **Vector Databases**: Efficiently stores and retrieves multimedia data, ensuring structured organization for quick access.

## Setup Instructions

Follow these steps to set up the **ai-app** project locally:

1. **Create a new folder for the project**:
   - Open your terminal or command prompt and create a new folder where you want to store the project.
   - Run the following command:
     ```bash
     mkdir memopin-ai-app
     cd memopin-ai-app
     ```

2. **Initialize Git**:
   - Inside your project folder, initialize a Git repository:
     ```bash
     git init
     ```

3. **Clone the repository**:
   - Clone the project repository to your local machine using the URL for your repository:
     ```bash
     git clone <this-repository-url>
     ```

4. **Install dependencies**:
   - Navigate to the `ai-app` folder (if not already there):
     ```bash
     cd ai-app
     ```
   - Install the required dependencies using npm:
     ```bash
     npm install
     ```

5. **Build the project**:
   - Once the dependencies are installed, run the following command to build the project:
     ```bash
     npm run build
     ```

6. **Start the application**:
   - After building the project, start the development server to run the app locally:
     ```bash
     npm run dev
     ```
   - Open your browser and visit `http://localhost:5173/` to view the application.

That's it! You should now have the **ai-app** running locally on your machine.

## Additional Repositories

Once you have the **ai-app** set up, you'll also need to set up the backend services for the project. There are two repositories you should clone and set up:

### 1. **AI Backend** Repository
The AI backend is responsible for handling audio processing, Pinecone integration, and memory-related functionality.

- Repository URL: [ai-backend](https://github.com/Yash8745/ai-backend)


### 2. **Node Backend** Repository
The **Node Backend** handles the MongoDB-related functionality, including user management, authentication, and storing login,signup related data.

- Repository URL: [node-backend](https://github.com/Yash8745/node-backend)

### After running node-backend and ai-backend run npm run dev to get all the functions the web app