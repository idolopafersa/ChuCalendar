package controllers

import (
	driver "backendgo/Driver"
	structmodels "backendgo/StructModels"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetExercise(w http.ResponseWriter, r *http.Request) {
	var exe structmodels.Exercise
	var nombre string

	if err := json.NewDecoder(r.Body).Decode(&nombre); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	exe, err := driver.GetExercise(nombre)
	if err != nil {
		fmt.Print(err)
		http.Error(w, "Exercise not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exe)
}

func PostExercise(w http.ResponseWriter, r *http.Request) {
	var exercise structmodels.NewExercise

	if err := json.NewDecoder(r.Body).Decode(&exercise); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		fmt.Print(err)
		return
	}

	// Si no está directamente en rutina, lo ponemos en -1 que será sinonimo de no asignado
	if exercise.RoutineID == 0 {
		exercise.RoutineID = -1
	}

	id, err := driver.PostExercise(exercise)
	if err != nil {
		fmt.Print(err)
		http.Error(w, "Error adding exercise", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(id)
}
