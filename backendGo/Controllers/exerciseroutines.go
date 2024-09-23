package controllers

import (
	driver "backendgo/Driver"
	"backendgo/security"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetrExercises(w http.ResponseWriter, r *http.Request) {
	routineID := r.URL.Query().Get("routine")

	if routineID == "" {
		http.Error(w, "Routine  is missing", http.StatusBadRequest)
		return
	}

	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	exercises, err := driver.GetExercisesInRoutine(routineID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error getting exercises of routine", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exercises)
}

func DelrExercise(w http.ResponseWriter, r *http.Request) {
	routineID := r.URL.Query().Get("routine")
	exerciseID := r.URL.Query().Get("exercise")

	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	err := driver.RemoveExerciseFromRoutine(routineID, exerciseID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error removing exercise from routine", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Exercise removed from routine successfully"})
}

func AddrExercise(w http.ResponseWriter, r *http.Request) {

	routineID := r.URL.Query().Get("routine")
	exerciseID := r.URL.Query().Get("exercise")

	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	err := driver.AddExerciseToRoutine(routineID, exerciseID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error adding exercise to routine", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Exercise added to routine successfully"})
}
