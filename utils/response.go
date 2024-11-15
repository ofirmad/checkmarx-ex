package utils

import (
	"encoding/json"
	"net/http"
)

// SendResponse sends a JSON response
func SendResponse(w http.ResponseWriter, data interface{}, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

// SendError sends an error response
func SendError(w http.ResponseWriter, message string, statusCode int) {
	SendResponse(w, map[string]string{"error": message}, statusCode)
}
