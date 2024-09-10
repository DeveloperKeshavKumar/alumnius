# ALUMNIUS

**ALUMNIUS** is a comprehensive platform designed to enhance the engagement and support of alumni associations for educational institutions. The platform includes functionalities for managing user accounts, job postings, success stories, events, and more.

## Features

- **User Management**: Signup, login, logout, and password management.
- **Job Postings**: Create, update, delete, and view job postings.
- **Success Stories**: Share and manage success stories.
- **Events**: Create, update, delete, and view events.
- **Alumni Directory**: Connect with alumni and manage connections.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Libraries**: Mongoose, Express-FileUpload

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/developerkeshavkumar/alumnius-backend.git
    cd alumnius
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the root directory and add your database connection string and any other configurations.

    ```env
    PORT=3003
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the Server**:

    ```bash
    npm start
    ```

    The server will start and listen on the port specified in your environment variables (default is usually 3000).

## API Endpoints

### **User Management**

- `POST /auth/signup` - Create a new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### **Job Postings**

- `GET /jobs` - Get all job postings
- `GET /jobs/:id` - Get a job posting by ID
- `POST /jobs/create` - Create a new job posting
- `PATCH /jobs/update/:id` - Update a job posting
- `DELETE /jobs/delete/:id` - Delete a job posting

### **Success Stories**

- `GET /stories` - Get all success stories
- `GET /stories/:id` - Get a success story by ID
- `POST /stories/create` - Create a new success story
- `PATCH /stories/update/:id` - Update a success story
- `DELETE /stories/delete/:id` - Delete a success story

### **Events**

- `GET /events` - Get all events
- `GET /events/:id` - Get an event by ID
- `POST /events/create` - Create a new event
- `PATCH /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event

### **Alumni Directory**

- `GET /alumnis` - Get all alumni
- `GET /alumnis/:id` - Get an alumni by ID
- `POST /alumnis/connect/:id` - Connect with an alumni
- `DELETE /alumnis/disconnect/:id` - Remove a connection with an alumni

## Middleware

- **Auth Middleware**: Validates authentication and handles token invalidation.
- **isAlumni Middleware**: Ensures only users with type `Alumni` can create, update, or delete job postings, success stories, or events.

## Contributing

Feel free to fork the repository and submit pull requests. Ensure that your code follows the project's coding standards and includes tests where applicable.
