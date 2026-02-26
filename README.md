# 🤖 BiteSpeed Chatbot Flow Builder

An interactive, extensible, and professional chatbot flow builder built with **React**, **TypeScript**, and **React Flow**. Designed for seamless user experience and robust conversational logic.

---

## 🔗 Live Demo
**[Click here to view the live application](https://deluxe-cendol-5168ea.netlify.app/)** *(Note: Replace with your actual deployment link)*

---

## ✨ Features

### 🛠️ Core Builder Functionality
- **Drag-and-Drop Interface**: Easily build flows by dragging nodes from the sidebar onto the infinite canvas.
- **Rich Media Support**:
  - 💬 **Text Nodes**: Standard message bubbles for conversational text.
  - 🖼️ **Image Nodes**: Visual content support with live URL previews.
  - 🎥 **Video Nodes**: Integrated video player support for multimedia engagement.
- **Smart Connection Logic**: 
  - **Single Source Restriction**: Enforces logical flow by allowing only one outgoing connection per source handle.
  - **Multi-Target Support**: Allows multiple paths to converge into a single node.

### ⚙️ User Experience & Management
- **Dynamic Settings Panel**: Context-aware sidebar that automatically switches from the "Nodes Gallery" to a "Settings Editor" when a node is selected.
- **Auto-Selection**: New nodes are automatically selected upon dropping, enabling instant editing.
- **Local Storage Persistence**: Your flow is automatically saved to the browser, ensuring no progress is lost on refresh.
- **Quick Deletion**: Integrated trash action on selected nodes for efficient flow management.

### 🛡️ Validation & Safety
- **Flow Integrity Check**: The "Save Changes" feature validates that the chatbot flow is properly connected.
- **Error Handling**: Displays descriptive alerts if the flow contains more than one disconnected "root" node.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm / yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```

---

## 🏗️ Architecture & Extensibility

This project is built with **extensibility** as a first-class citizen. 

- **Custom Node Architecture**: Adding a new node type (e.g., "Quick Replies" or "API Call") requires just three simple steps:
  1. Define the data interface in `src/types.ts`.
  2. Create a component in `src/components/`.
  3. Register it in the `nodeTypes` map in `FlowBuilder.tsx`.
- **TypeScript First**: Full type safety across the builder, ensuring reliable data handling between nodes and edges.
- **Modular Components**: Separation of concerns between the canvas ([FlowBuilder.tsx](file:///c:/Users/LENOVO/OneDrive/Desktop/bitefrontend/src/components/FlowBuilder.tsx)), the sidebar ([Sidebar.tsx](file:///c:/Users/LENOVO/OneDrive/Desktop/bitefrontend/src/components/Sidebar.tsx)), and individual node types.

---

## 🎨 Tech Stack
- **Frontend**: React 18
- **Flow Engine**: [React Flow](https://reactflow.dev/)
- **Icons**: Lucide React
- **Styling**: Modern CSS3 (Flexbox/Grid)
- **Tooling**: Vite, TypeScript

---

## 📝 Requirement Checklist
- [x] **Text Node Support**
- [x] **Nodes Panel** with Drag & Drop
- [x] **Settings Panel** for editing node data
- [x] **Source/Target Handle Restrictions**
- [x] **Flow Validation** (Single root node check)
- [x] **Extensible Design** (Already includes Image and Video nodes)

---

Developed with ❤️ for the BiteSpeed Frontend Task.
