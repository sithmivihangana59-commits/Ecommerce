# E-Market Store

## Project Overview

E-Market Store is a data-driven Single Page Application (SPA) developed using Vue 3, TypeScript, Vite, and Tailwind CSS. The application consumes product data from the public DummyJSON API and provides a user-friendly interface for browsing and interacting with products.

## Technologies Used

* Vue 3
* TypeScript
* Vite
* Tailwind CSS
* Vue Router
* Pinia
* DummyJSON REST API

## Features Implemented

* Product data fetched from the DummyJSON API
* Product listing and display
* Product search
* Product category filtering
* Product detail view
* Dynamic routing using Vue Router
* Shopping cart using Pinia
* Simulated user authentication
* Login and logout functionality
* Light/Dark mode
* Responsive design for mobile, tablet, and desktop
* Promotional banner carousel
* Reusable Vue components
* TypeScript interfaces for API data

## Component Architecture

The application is divided into logical and reusable components instead of implementing the entire interface inside `App.vue`.

```text
App.vue
│
├── NavBar.vue
│
└── Router View
    │
    ├── HomePage.vue
    │   ├── BannerCarousel.vue
    │   ├── SearchBar.vue
    │   ├── CategoryFilter.vue
    │   └── ProductGrid.vue
    │       └── ProductCard.vue
    │
    ├── ProductDetailPage.vue
    │
    ├── CartPage.vue
    │
    └── Login.vue
```

The API-related functionality is separated into the API layer, while the shopping cart state is managed globally using Pinia. Dark mode functionality is handled through a composable.

## API

The application uses the DummyJSON public REST API.

Base URL:

```text
https://dummyjson.com
```

The application uses API endpoints for:

* Retrieving products
* Searching products
* Retrieving product categories
* Filtering products by category
* Retrieving individual product details

## Installation

### Prerequisites

* Node.js
* npm

### Install Dependencies

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/sithmivihangana59-commits/Ecommerce.git
cd Ecommerce
```

Install the project dependencies:

```bash
npm install
```

### Run the Application

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, normally:

```text
http://localhost:5173/
```

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── api/
├── components/
├── composables/
├── pages/
├── router/
├── stores/
├── types/
├── App.vue
├── main.ts
└── style.css
```

## TypeScript

The application uses TypeScript interfaces to represent API response data and product information. This provides strict typing and helps maintain type safety throughout the application.


## GitHub Repository

GitHub Repository:

[https://github.com/sithmivihangana59-commits/Ecommerce]
## Submission Contents

The final submission ZIP file should contain:

```text
Source Code
README.md
Report.pdf
prompts.txt
```

## GenAI Usage

AI tools were used during development for tasks such as generating CSS classes, assisting with TypeScript interfaces, debugging, and development support. The AI usage and prompts are documented separately in `prompts.txt` according to the required format.

## Developer

SENARATHNA S.V.
EG/2023/5881

Computer Engineering Undergraduate

## Academic Project

**Module:** GUI Programming
**Project:** The Modern Single Page Application (SPA)
**Department:** Computer Engineering
