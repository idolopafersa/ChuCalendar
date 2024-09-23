package controllers

import (
	driver "backendgo/Driver"
	"backendgo/security"
	"encoding/json"
	"fmt"
	"net/http"
)

func Getday(w http.ResponseWriter, r *http.Request) {

	userID := r.URL.Query().Get("user")
	date := r.URL.Query().Get("date")

	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	day, err := driver.GetDay(userID, date)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Could not get day", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(day)
}

func AddMealToDay(w http.ResponseWriter, r *http.Request) {
	date := r.URL.Query().Get("date")
	mealID := r.URL.Query().Get("meal")

	if err := security.VerifyToken(r.Header.Get("Authorization")); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	err := driver.AddMealToDay(date, mealID)
	if err != nil {
		http.Error(w, "Could not add meal to day", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Meal added successfully")

}
