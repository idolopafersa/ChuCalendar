package controllers

import (
	driver "backendgo/Driver"
	structmodels "backendgo/StructModels"
	"backendgo/security"
	"encoding/json"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var creds structmodels.Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Body errors", http.StatusBadRequest)
		return
	}

	if driver.UserExists(creds.Username) && driver.CorrectPassword(creds.Username, creds.Password) {
		token, _ := security.CreateToken(creds.Username)

		w.Header().Set("Content-Type", "application/json")
		response := map[string]string{"token": token}
		json.NewEncoder(w).Encode(response)
	} else {
		http.Error(w, "User or password are wrong", http.StatusForbidden)
	}

}
