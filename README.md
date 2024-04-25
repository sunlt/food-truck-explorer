# Food Truck Explorer

Food Truck Explorer is an application designed to help teams discover and explore food trucks in San Francisco. The application utilizes open data provided by the San Francisco city government for displaying and querying food truck information.

## Technology Stack

- Frontend: React
- Backend: Node.js + Koa
- Database: with csv
- Language: JavaScript
- Other: Docker (optional, choose as needed)

## Features

- Display nearby food trucks
- Search for nearby food trucks based on location
- View detailed information about food trucks
- Provide a simple user interaction interface

## Directory Structure

- `client`: Contains the frontend code written in React.
- `server`: Contains the backend code written in Node.js with Express.
- `cli`: Contains the command-line interface (CLI) tools for interacting with the application's data.
- `shared`: Shared code

## CLI

The CLI tools for performing various tasks related to the Food Truck Explorer application. Here are some available commands:

- `./food-truck-explorer find-taco`: Get the names of all the taco trucks.
- `./food-truck-explorer info <id>`: Get detailed information about a specific food truck by its ID.

## Getting Started

- Clone the repository to your local machine:

```bash
git clone https://github.com/sunlt/food-truck-explorer.git
cd food-truck-explorer
```

- Install dependencies:

```bash
npm run init

```

- Start the frontend and backend applications:

```bash
npm run dev-client
npm run dev-server
```

Open a web browser and navigate to [http://localhost:3001](http://localhost:3001) to view the application.

## Deployment

- Build the application:

```bash
npm run build
```

- Run the application:

```bash
npm run prod
```

- Build Docker image:

```bash
docker build -t food-truck-explorer .
```

## Contribution

If you have any suggestions or find any bugs, feel free to open an issue or submit a pull request. We welcome your contributions!

## License

MIT
