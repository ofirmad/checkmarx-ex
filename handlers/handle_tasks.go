package handlers

import (
	"encoding/json"
	"errors"
	"github.com/ofirmad/task-manager/models"
	"github.com/ofirmad/task-manager/services"
	"github.com/ofirmad/task-manager/utils"
	"net/http"
	"strconv"
	"strings"
)

const (
	titleRequired       = "title is required"
	descriptionRequired = "description is required"
	statusRequired      = "status is required"
)

func HandleTasks(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var task models.Task
		if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
			utils.SendError(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		if validateTaskErr := validateTask(task); validateTaskErr != nil {
			utils.SendError(w, validateTaskErr.Error(), http.StatusBadRequest)
			return
		}

		newTask := services.CreateTask(task)
		utils.SendResponse(w, newTask, http.StatusCreated)

	case http.MethodGet:
		tasks := services.GetAllTasks()
		utils.SendResponse(w, tasks, http.StatusOK)

	default:
		utils.SendError(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func HandleTaskByID(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/tasks/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.SendError(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodGet:
		task, err := services.GetTaskByID(id)
		if err != nil {
			utils.SendError(w, err.Error(), http.StatusNotFound)
			return
		}
		utils.SendResponse(w, task, http.StatusOK)

	case http.MethodPut:
		var updatedTask models.Task
		if err := json.NewDecoder(r.Body).Decode(&updatedTask); err != nil {
			utils.SendError(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		if validateTaskErr := validateTask(updatedTask); validateTaskErr != nil {
			utils.SendError(w, validateTaskErr.Error(), http.StatusBadRequest)
			return
		}

		task, err := services.UpdateTask(id, updatedTask)
		if err != nil {
			utils.SendError(w, err.Error(), http.StatusNotFound)
			return
		}
		utils.SendResponse(w, task, http.StatusOK)

	case http.MethodDelete:
		if err := services.DeleteTask(id); err != nil {
			utils.SendError(w, err.Error(), http.StatusNotFound)
			return
		}
		w.WriteHeader(http.StatusNoContent)

	default:
		utils.SendError(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func validateTask(task models.Task) error {
	if task.Title == "" {
		return errors.New(titleRequired)
	}
	if task.Description == "" {
		return errors.New(descriptionRequired)
	}
	if task.Status == "" {
		return errors.New(statusRequired)
	}
	return nil
}
