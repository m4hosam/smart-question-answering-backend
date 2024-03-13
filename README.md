# ExpressJS App Documentation

This documentation provides an overview of the ExpressJS app and instructions on how to run it, as well as how to run the Prisma client and clone the repository.

## Prerequisites

Before running the ExpressJS app, make sure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)
- Prisma CLI (for running the Prisma client)

## Installation

To install the ExpressJS app and its dependencies, follow these steps:

1. Clone the repository by running the following command in your terminal:

   ```bash
   git clone https://github.com/m4hosam/smart-question-answering-backend.git

   ```

2. install the dependencies using
   ```bash
    npm install
   ```
3. Generate prisma client
   ```bash
   npx prisma db push
   npx prisma generate
   ```
4. Run the server using NodeJS (nodemon is preferred during development)
   ```bash
   node server.js
   ```
