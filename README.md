# Movie Catalog

## Project Overview
A **Movie Catalog** application that utilizes the [The Movie Database (TMDb) API](https://developer.themoviedb.org/reference/intro/getting-started) to display movies by genre, provide a search functionality, and show detailed movie information when a movie is clicked.

## Features
- Browse movies by genre.
- Search for movies using a search bar.
- View detailed information for each movie, including its title, synopsis, ratings, and release date.

## Project Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14.x or higher recommended)
- **npm** (comes with Node.js)

### Installation Instructions
Clone the repository and install the dependencies:
```bash
git clone https://github.com/username/movie-catalog.git
cd movie-catalog
npm install
```

## Configuration

### API Key
To fetch data from the TMDb API, you'll need an API key. Follow these steps to set it up:

1. **Sign Up**: Create an account at [TMDb](https://www.themoviedb.org/) if you haven't already.
2. **Generate API Key**: Navigate to your account settings and request an API key from the **API section**.
3. **Add API Key to Your Project**:
   - Create a `.env` file in the root of your project if it doesn't exist.
   - Add your API key to the `.env` file as follows:
     ```plaintext
     VUE_APP_TMDB_API_KEY=your_api_key_here
     ```

### Environment Variables
- The application uses environment variables to securely access the TMDb API key. Make sure your `.env` file is included in your `.gitignore` to prevent it from being pushed to version control.
- The key can be accessed in your Vue application code using:
  ```javascript
  const apiKey = process.env.VUE_APP_TMDB_API_KEY;
    ```

## Running the Project

### Development
To start the development server with hot-reloading, use the following command:
```bash
npm run serve
```

### Explanation:
- **Development**: The `npm run serve` command starts a local development server that automatically updates the app when code changes are detected.
- **Production Build**: The `npm run build` command creates an optimized version of the app for production, making it ready to be deployed to a web server.
- **Running Tests**: The `npm run test:unit` command runs the project's unit tests to ensure your code is functioning as expected.
