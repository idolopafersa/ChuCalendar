package controllers

import (
	driver "backendgo/Driver"
	structmodels "backendgo/StructModels"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetMeal(w http.ResponseWriter, r *http.Request) {
	var name structmodels.MealRequest
	if err := json.NewDecoder(r.Body).Decode(&name); err != nil {
		http.Error(w, "Invalid request payload: missing or incorrect meal name", http.StatusBadRequest)
		return
	}
	fmt.Print(name)
	meal, err := driver.GetMeal(name.Name)
	fmt.Print(err)
	if err != nil {

		http.Error(w, "Meal not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(meal)

}

func PostMeal(w http.ResponseWriter, r *http.Request) {
	var nmeal structmodels.NewMeal

	if err := json.NewDecoder(r.Body).Decode(&nmeal); err != nil { //Recogemos el body, debe haber todo un Meal
		http.Error(w, "Invalid payload", 400)
	}

	id, err := driver.PostMeal(nmeal)
	if err != nil {
		http.Error(w, "couldnt Post", http.StatusNotFound)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(id)
}

func DelMeal(w http.ResponseWriter, r *http.Request) {
	var name structmodels.MealRequest
	if err := json.NewDecoder(r.Body).Decode(&name); err != nil {
		http.Error(w, "Invalid request payload: missing or incorrect meal name", http.StatusBadRequest)
		return
	}
	fmt.Print(name)

	err := driver.DelMeal(name.Name)
	if err != nil {
		http.Error(w, "No Meal", http.StatusNotFound)
	}
}

func PutMeal(w http.ResponseWriter, r *http.Request) {
	var meal structmodels.Meal

	if err := json.NewDecoder(r.Body).Decode(&meal); err != nil {
		http.Error(w, "Payload inválido", http.StatusBadRequest)
		fmt.Print(err)
		return
	}

	err := driver.UpdateMeal(meal)
	fmt.Print(err)
	if err != nil {
		http.Error(w, "Error al actualizar la comida", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Comida actualizada exitosamente"})
}
