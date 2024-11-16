package services

import (
	"errors"
	"github.com/ofirmad/task-manager/models"
	"time"
)

const TaskNotFound = "task not found"

// CreateTask adds a new task to the in-memory database
func CreateTask(task models.Task) models.Task {
	models.DB.Mutex.Lock()
	defer models.DB.Mutex.Unlock()

	task.ID = models.DB.NextID
	models.DB.NextID++
	task.CreatedAt = time.Now()
	models.DB.Tasks[task.ID] = &task
	return task
}

// GetAllTasks retrieves all tasks from the database
func GetAllTasks() []models.Task {
	models.DB.Mutex.RLock()
	defer models.DB.Mutex.RUnlock()

	tasks := make([]models.Task, 0, len(models.DB.Tasks))
	for _, task := range models.DB.Tasks {
		tasks = append(tasks, *task)
	}
	return tasks
}

// GetTaskByID retrieves a task by its ID
func GetTaskByID(id int) (models.Task, error) {
	models.DB.Mutex.RLock()
	defer models.DB.Mutex.RUnlock()

	task, exists := models.DB.Tasks[id]
	if !exists {
		return models.Task{}, errors.New(TaskNotFound)
	}
	return *task, nil
}

// UpdateTask updates an existing task
func UpdateTask(id int, updatedTask models.Task) (models.Task, error) {
	models.DB.Mutex.Lock()
	defer models.DB.Mutex.Unlock()

	task, exists := models.DB.Tasks[id]
	if !exists {
		return models.Task{}, errors.New(TaskNotFound)
	}

	task.Title = updatedTask.Title
	task.Description = updatedTask.Description
	task.Status = updatedTask.Status
	return *task, nil
}

// DeleteTask removes a task by its ID
func DeleteTask(id int) error {
	models.DB.Mutex.Lock()
	defer models.DB.Mutex.Unlock()

	if _, exists := models.DB.Tasks[id]; !exists {
		return errors.New(TaskNotFound)
	}
	delete(models.DB.Tasks, id)
	return nil
}
