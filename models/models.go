package models

import (
	"sync"
	"time"
)

const (
	JsonID          = "id"
	JsonTitle       = "title"
	JsonDescription = "description"
	JsonStatus      = "status"
	JsonCreatedAt   = "created_at"
)

// Task represents a task
type Task struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

// Database represents the in-memory storage
type Database struct {
	Tasks  map[int]*Task
	NextID int
	Mutex  sync.RWMutex
}

// Global instance of the database
var DB = Database{
	Tasks:  make(map[int]*Task),
	NextID: 1,
}
