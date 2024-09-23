package controllers

import (
	driver "backendgo/Driver"
	structmodels "backendgo/StructModels"
	"backendgo/security"
	"encoding/json"
	"fmt"
	"net/http"
)

func PostRoutine(w http.ResponseWriter, r *http.Request) {
	var routine structmodels.NewRoutine

	if err := json.NewDecoder(r.Body).Decode(&routine); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	id, err := driver.PostRoutine(routine)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error creating routine", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(id)
}

func GetRoutine(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")

	if name == "" {
		http.Error(w, "Name parameter is missing", http.StatusBadRequest)
		return
	}

	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	routine, err := driver.GetRoutine(name)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Routine not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(routine)
}

func PutRoutine(w http.ResponseWriter, r *http.Request) {
	var routine structmodels.Routine

	if err := json.NewDecoder(r.Body).Decode(&routine); err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	err := driver.PutRoutine(routine)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error updating routine", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Routine updated "})
}

func DelRoutine(w http.ResponseWriter, r *http.Request) {

	name := r.URL.Query().Get("name")

	if name == "" {
		http.Error(w, "Name parameter is missing", http.StatusBadRequest)
		return
	}
	fmt.Println(r.Header.Get("Authorization"))
	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Print(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	err := driver.DelRoutine(name)
	if err != nil {
		fmt.Print(err)
		http.Error(w, "routine not found", http.StatusNotFound)
		return
	}
}
