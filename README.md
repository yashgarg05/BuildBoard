# BuildBoard

BuildBoard is a platform designed for developers, creators, and product builders to showcase their projects, discover trending builds, receive community feedback, and track upvotes.

## Features

- **Product Feed**: Search, filter by category tags, and sort projects by trending status or upvotes.
- **Showcase & Discovery**: Interactive product showcase carousel and scroll animations on the landing page.
- **Product Details & Interaction**: In-depth product view with media galleries, tech stack tags, launch metrics, and user comments.
- **Creator Dashboard**: Submit new products, edit existing listings, and manage user profiles.
- **Authentication**: Token-based client authentication state management with route protection for private pages.

## Tech Stack

- **Frontend**: React (Vite)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Vanilla CSS3

## Project Structure

```
BuildBoard/
├── public/
├── src/
│   ├── components/      # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   ├── context/         # Auth and Product state providers
│   ├── data/            # Mock dataset for initial products
│   ├── pages/           # Application pages (Landing, Feed, Details, Auth, Profile)
│   ├── App.jsx          # Route configuration
│   ├── index.css        # Global CSS design tokens and base styles
│   └── main.jsx         # React application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 16.0.0 or higher)
- npm (version 8.0.0 or higher) or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yashgarg05/BuildBoard.git
   ```

2. Navigate into the project directory:
   ```bash
   cd BuildBoard
   ```

3. Install project dependencies:
   ```bash
   npm install
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

## Building for Production

To create an optimized production build, run:

```bash
npm run build
```

To locally preview the production build, run:

```bash
npm run preview
```

## Contributing

1. Create a feature branch (`git checkout -b feature/your-feature-name`)
2. Commit your changes (`git commit -m "feat: description of change"`)
3. Push to the branch (`git push origin feature/your-feature-name`)
4. Open a Pull Request on GitHub

## License

This project is licensed under the MIT License.
