package main

import (
	"fmt"
	"github.com/ofirmad/task-manager/handlers"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	// Separate the routes into their own handlers package
	mux.HandleFunc("/tasks", handlers.HandleTasks)
	mux.HandleFunc("/tasks/", handlers.HandleTaskByID)

	fmt.Println("Server is running on http://localhost:8080")
	http.ListenAndServe(":8080", mux)
}
