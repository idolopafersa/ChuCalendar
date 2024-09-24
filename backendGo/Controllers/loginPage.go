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
		//when a user sign in, they will receive a cookie to keep their JWT
		cookie := http.Cookie{
			Name:     "token",
			Value:    token,
			Path:     "/",
			HttpOnly: true,
			MaxAge:   3600,
			Secure:   true,
		}
		http.SetCookie(w, &cookie)

	} else {
		http.Error(w, "User or password are wrong", http.StatusForbidden)
	}

}
