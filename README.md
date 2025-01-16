
# Gourmet Dashboard

A brief description of your project, its purpose, and features.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
<p  align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">             
<p>
  

## Features
- Authentication system
- Cart management
- Dynamic 3D background rendering
- Redux-based state management
- Modular and reusable components

<p  align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">             
<p>
  

## Installation

Follow these steps to get the project up and running locally:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/18-RAJAT/Gourmet-Dashboard.git
   cd Gourmet-Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

<p  align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">             
<p>
  
## Usage

1. Run the development server as mentioned above.
2. Access the app in your browser.
3. Explore the features, such as authentication, adding items to the cart, and navigating through the header.

<p  align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">             
<p>
  

## Project Structure

```plaintext
src/
├── animations/        # Animation-related files
│   └── delivery.json
├── components/        # React components
│   ├── Auth.tsx
│   ├── Cart.tsx
│   ├── Header.tsx
│   └── ThreeBackground.tsx
├── store/             # Redux slices and store
│   ├── authSlice.ts
│   ├── cartSlice.ts
│   ├── store.ts
│   └── themeSlice.ts
├── App.tsx            
├── index.css          
├── main.tsx           
└── vite-env.d.ts      

.eslint.config.js      
.gitignore             
index.html             
package-lock.json      
```
<p  align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">             
<p>
  
