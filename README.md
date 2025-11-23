# 📊 Interactive Analytics Chart (React + TypeScript + Vite)

This project implements a fully interactive analytics chart using **React**, **TypeScript**, **Vite**, and **Recharts**.

It includes:
- Dynamic filtering of variations
- Day/Week data aggregation
- Line / Smooth / Area visualization types
- Custom tooltip
- Theme switching (Light / Dark)
- Reusable dropdown components
- Mobile-responsive layout

---

## 🚀 Technologies Used

- **React 18**
- **TypeScript**
- **Vite**
- **Recharts**
- **CSS Modules**
- **Custom Hooks** (`useOutsideClick`)
- **Theme Context (CSS variables + LocalStorage)**

---

## ✨ Features Overview

### ✔ Variations Selector
Multi-select dropdown with checkboxes to toggle chart lines.

### ✔ Mode Selector
Switch between:
- **Day** — show daily data.
- **Week** — automatic weekly aggregation using a custom `getWeekNumber` function.

### ✔ Line Style Selector
Available visualization types:
- **Line**
- **Smooth (monotone)**
- **Area (gradient fill)**

### ✔ Custom Tooltip
Displays all variation values for the selected day/week.

### ✔ Light / Dark Theme
Implemented using:
- CSS variables
- Context API
- LocalStorage persistence

### ✔ Responsive Layout
Adaptive chart height and dropdown positioning for mobile.

---

## 🛠 Local Installation

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Create production build
```bash
npm run build
```

### 4. Preview build
```bash
npm run preview
```
🔗 **Live Demo:** https://lenalih.github.io/frontend-interactive-chart/
---

## 🧑‍💻 Author

 **Elena Likhosherstova** 