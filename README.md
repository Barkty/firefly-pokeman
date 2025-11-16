# Pokémon Explorer Frontend

A React-based frontend application for browsing, viewing details, and managing favorite Pokémon.  
This project was built as part of the **Full-Stack Engineer Home Assignment**.

---

## 📌 Overview

This frontend application allows users to:

- Browse the **first 150 Pokémon** in a scrollable list
- View detailed Pokémon information, including:
  - Abilities
  - Types
  - Evolution options (if available)
- Mark Pokémon as **favorites**, synced with the backend API
- Filter Pokémon to show **favorites only**
- Search Pokémon by name *(bonus feature)*
- Enjoy smooth interactions with animations and a clean UI

The app communicates with a custom Node.js backend that proxies the PokéAPI and manages favorite persistence.

---

## 🚀 Tech Stack

- React
- TypeScript *(if applicable)*
- Axios or Fetch API
- CSS Modules / Tailwind / Styled Components *(depending on your setup)*
- React Query / Custom hooks *(if used)*

---

## 📂 Project Structure

src/
├── components/ # Reusable UI components
├── pages/ # Page-level components (if applicable)
├── hooks/ # Custom hooks for fetching and logic
├── services/ # API request logic to backend
├── context/ # Global state management
├── assets/ # Images, icons, styles
└── App.jsx/tsx # App entry point

yaml
Copy code

---

## 🧩 Features

### ✅ Pokémon List
- Displays the first 150 Pokémon
- Infinite scroll or lazy loading *(bonus)*
- Favorite Pokémon marked with badge/icon

### ✅ Pokémon Details
- Shows abilities, types, and evolution chain
- Clean and easy-to-read UI layout

### ✅ Favorites Management
- Add/remove Pokémon from favorites
- Filtering to show favorites only
- Backend synchronization for persistence

### 🎁 Bonus Features
- Search bar to filter Pokémon by name
- Smooth animations for interactions
- Improved loading states (skeletons/spinners)

---

## 🔌 Backend Integration

The frontend interacts with the backend via the following endpoints:

GET /api/pokemon # List first 150 Pokémon
GET /api/pokemon/:id # Pokémon details
GET /api/favorites # List favorite Pokémon
POST /api/favorites/:id # Add favorite
DELETE /api/favorites/:id # Remove favorite
