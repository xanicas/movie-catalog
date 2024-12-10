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
   - Copy `.env.example` to a new file called `.env` in the root of your project.
   - Add your API key to the `.env` file as follows:
     ```plaintext
     VUE_APP_TMDB_API_KEY=your_api_key_here
     ```

## Running the Project

### Development
To start the development server with hot-reloading, use the following command:
```bash
npm run serve
```
This will start the application in development mode and watch for any changes you make to the code. The development server will typically be accessible at `http://localhost:8080`.

### Production Build
To create a production build of the project, use the following command:
```bash
npm run build
```
This command will compile and minify the project files into a `dist` directory. The generated files are optimized for production deployment and can be served by any static file server.

### Running Tests
To run the unit tests and verify the correctness of the application, use:
```bash
npm run test:unit
```
This will execute the unit tests in the project and display the results in the console.