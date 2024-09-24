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

	cookie, err := r.Cookie("jwt_token")
	if err != nil {
		http.Error(w, "Unauthorized: No valid cookie", http.StatusUnauthorized)
		return
	}

	// Extract the JWT from the cookie value
	jwtToken := cookie.Value

	if err := security.VerifyToken(jwtToken); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	//The user should only see the day if its the owner

	/*if driver.CheckUser(userID, date) {
		http.Error(w, "Not the onwer user", http.StatusForbidden)
	}
	*/
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

	cookie, err := r.Cookie("jwt_token")
	if err != nil {
		http.Error(w, "Unauthorized: No valid cookie", http.StatusUnauthorized)
		return
	}

	// Extract the JWT from the cookie value
	jwtToken := cookie.Value

	if err := security.VerifyToken(jwtToken); err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JWT", http.StatusForbidden)
		return
	}

	erre := driver.AddMealToDay(date, mealID)
	if erre != nil {
		http.Error(w, "Could not add meal to day", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Meal added successfully")

}
