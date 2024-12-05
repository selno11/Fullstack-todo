Welcome to the Todo App! This project is a simple, interactive Todo list application built using React, Next.js, Prisma, and a PostgreSQL database. It allows users to create, update, delete, and mark todos as completed.

If you'd like to clone this project and run it locally, follow the instructions below.

Prerequisites
Before running the application locally, make sure you have the following installed:

Node.js (v18 or later) - You can download it from nodejs.org.

PostgreSQL - You need PostgreSQL installed locally or use a cloud provider like Heroku, Render, or Supabase for a PostgreSQL database.

Prisma CLI - Install Prisma globally using npm or yarn:

bash
Copy code
npm install -g prisma
Steps to Clone and Run Locally
1. Clone the Repository
Clone this project to your local machine using the following command:

bash
Copy code
git clone https://github.com/your-username/todo-app.git
cd todo-app
2. Install Dependencies
Navigate to the project folder and install all the required dependencies:

bash
Copy code
npm install
3. Set Up PostgreSQL Database
Local PostgreSQL: If you're using a local PostgreSQL instance, create a new database. You can use the following command in your terminal to create a database:

sql
Copy code
CREATE DATABASE todoapp;
Cloud PostgreSQL (Optional): If you're using a cloud PostgreSQL provider, create a database and note the connection string.

4. Configure Environment Variables
You need to set up your .env file for Prisma to connect to the PostgreSQL database.

Create a .env file in the root of the project and set the following environment variable:

env
Copy code
DATABASE_URL="postgresql://user:password@localhost:5432/todoapp?schema=public"
Replace user, password, and localhost:5432 with your actual database credentials if you're not using the default PostgreSQL configuration.

5. Run Prisma Migrations
Run the Prisma migration commands to set up the database schema:

bash
Copy code
npx prisma migrate dev --name init
This will apply the database schema to your PostgreSQL database. Prisma will generate the necessary tables for your app, including the todo table.

6. Start the Application
Run the development server using the following command:

bash
Copy code
npm run dev
Your application should now be running at http://localhost:3000.

How It Works
Frontend (React + Next.js)
State Management: The application uses React's useState and useEffect hooks to manage state and perform side-effects (such as fetching data from the backend).
Todo List Operations: Users can add a new task, update an existing task, delete a single task, or clear all tasks at once.
Checkbox for Completion: You can mark tasks as completed, which toggles the state of the task in the database.
The frontend communicates with the backend via API calls (using the fetch API) to perform CRUD operations (Create, Read, Update, Delete) on todos.

Backend (Next.js API Routes)
The backend uses Next.js API Routes to handle requests for CRUD operations.

GET: Fetches all todos from the database.
POST: Adds a new todo to the database.
PUT: Updates an existing todo, including the task or the completion status (isCompleted).
DELETE: Deletes a single todo or all todos.
API routes are handled by the following functions:

GET: Fetches all todos from the database and returns them as a JSON response.
POST: Receives the new task from the request body, adds it to the database, and returns the added todo.
PUT: Accepts the id, task, and isCompleted from the request body, updates the corresponding todo in the database, and returns the updated todo.
DELETE: Accepts the id of the todo to delete, deletes it from the database, and returns the deleted todo. If no id is passed, it deletes all todos.
Prisma
Prisma is used as the ORM (Object-Relational Mapping) tool for interacting with the PostgreSQL database. It generates the necessary SQL queries to interact with the database based on your defined models in the Prisma schema (schema.prisma).

Folder Structure
bash
Copy code
/
├── pages/              # Next.js pages (API Routes and React components)
│   ├── api/            # API routes for handling requests
│   ├── index.js        # Main page (React components for Todo list)
│
├── prisma/             # Prisma schema file
│   ├── schema.prisma   # Defines the database schema
│
├── .env                # Environment variables (including database connection URL)
├── package.json        # Project dependencies and scripts
├── prisma/             # Prisma migration files and generated client
└── public/             # Static files like images
Important Files
pages/api/todos.js: The API routes for managing todos (GET, POST, PUT, DELETE).
pages/index.js: The React component responsible for rendering the todo list and interacting with the backend.
Troubleshooting
1. Database Connection Issues
Ensure that your PostgreSQL instance is running and that the DATABASE_URL in your .env file is correct. If you're using a cloud database provider, ensure that the credentials and connection string are accurate.

2. Prisma Migrations Fail
If Prisma migrations fail, make sure your prisma/schema.prisma file is correctly defined and your database connection is working. You can reset the database and rerun migrations with:

bash
Copy code
npx prisma migrate reset
3. CORS Issues
If you're encountering CORS issues, ensure that the frontend and backend are correctly configured to allow communication between them. In local development, this should not typically be an issue unless you're using a custom server setup.

Conclusion
That's all! You now have a fully functional Todo application running locally with React, Next.js, Prisma, and PostgreSQL. Feel free to modify and extend the app according to your requirements!

If you encounter any issues or have questions, feel free to reach out or create an issue on the GitHub repository.

Happy coding! 🎉
