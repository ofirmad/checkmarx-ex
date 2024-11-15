# checkmarx-ex - Ofir Kolin

## Design - Backend

### Framework
* Option 1 - Standard library (net/http)
    * **Pros**: Lightweight, no external dependencies, provides granular control.
    * **Cons**: Requires more boilerplate for routing, request parsing, and response handling.
* Option 2 - Gorilla Mux
    * **Pros**: Powerful routing capabilities and request parsing.
    * **Cons**: Adds an external dependency, might be overkill for a simple API.

**Choice**: net/http for simplicity and minimalism.

### Database Storage
* Option 1 - In-memory structs
    * **Pros**: No external dependencies, easy to set up and use.
    * **Cons**: Data is lost on server restart.
* Option 2 - SQLite
    * **Pros**: Lightweight, persistent storage.
    * **Cons**: Requires additional setup and configuration.

**Choice**: In-memory structs for simplicity and ease of use. (Also - I have experience with it)

### API Design
* Endpoints:
    * `GET /tasks`: Get all tasks
    * `POST /tasks`: Create a new task
    * `GET /tasks/{id}`: Get task details by ID
    * `PUT /tasks/{id}`: Update a task by ID (title, description, or status)
    * `DELETE /tasks/{id}`: Delete a task by ID

### Structs and Models
Each task will be represented by the following struct:
```go
type Task struct {
    ID          int       `json:"id"`
    Title       string    `json:"title"`
    Description string    `json:"description"`
    Status      string    `json:"status"`
    CreatedAt   time.Time `json:"created_at"`
}
```

```go
type Database struct {
    Tasks  map[int]*Task 
    NextID int           
    Mutex  sync.RWMutex   
}
```

### Assumptions
* All fields (title, description and status) are required for task creation/update.
* Task status can be one of the following: "TODO", "in-progress", "Pending" or "Completed".

## Implementation Plan - Backend

### Project Structure
* `main.go`: Entry point for the application.
* `handlers/handle_tasks.go`: Request handlers for each endpoint.
* `models/models.go`: Task struct definition and in-memory storage.
* `utils/response.go`: Helper functions for request parsing and response writing.
* `services/task_service.go`: Business logic for task creation, retrieval, update, and deletion.

### Endpoints Testing
* `GET /tasks`: Get all tasks
    * **Test Case 1**: No tasks in the list
    * **Test Case 2**: One task in the list
    * **Test Case 3**: Multiple tasks in the list

* `POST /tasks`: Create a new task
    * **Test Case 1**: Valid task creation
    * **Test Case 2**: Invalid task creation (missing fields)

* `GET /tasks/{id}`: Get task details by ID
    * **Test Case 1**: Task exists and correct task is returned
    * **Test Case 2**: Task does not exist (404 response)

* `PUT /tasks/{id}`: Update a task by ID
    * **Test Case 1**: Valid task update with valid input
    * **Test Case 2**: Task does not update with invalid input
    * **Test Case 3**: Task does not exist (404 response)

* `DELETE /tasks/{id}`: Delete a task by ID
    * **Test Case 1**: Task exists and is deleted
    * **Test Case 2**: Task does not exist (404 response)

## Design - Frontend

I chose to use vite as the frontend framework for this project. I chose vite I read that it is a faster alternative to create-react-app.

### Components
* `TaskList`: Display a list of tasks
* `TaskForm`: Form to create or update a task

### UI Design
* Title: Task Manager
* Task List:
    * Display task id, title, description and status.
    * Provide buttons to edit and delete each task.
* Task Form:
    * Input fields for title, description, and status (dropdown).
    * Submit button to create or update a task.
    * Cancel button to clear the form.

