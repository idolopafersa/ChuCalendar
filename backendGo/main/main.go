package main

import (
	controllers "backendgo/Controllers"
	driver "backendgo/Driver"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/lpernett/godotenv"
)

func main() {

	//Intenta pillar las variables del .env
	if err := godotenv.Load(); err != nil {
		panic("No .env file found")
	}

	//Inicicializar la base de datos
	driver.OpenDB()

	//Creamos el router para empezar las peticiones
	r := mux.NewRouter()

	//Para hacer login y register
	r.HandleFunc("/api/login", controllers.Login).Methods("POST")
	r.HandleFunc("/api/postUser", controllers.CreateUser).Methods("POST")

	//Para las comidas, deberemos hacer un get post  put y remove

	r.HandleFunc("/api/getMeal", controllers.GetMeal).Methods("GET")
	r.HandleFunc("/api/postMeal", controllers.PostMeal).Methods("POST")
	r.HandleFunc("/api/delMeal", controllers.DelMeal).Methods("DELETE")
	r.HandleFunc("/api/putMeal", controllers.PutMeal).Methods("PUT")

	//Para las rutinas, get post put y añadir y eliminar ejercicios de la rutina
	/*r.HandleFunc("/api/getRoutine", controllers.GetRoutine).Methods("GET")
	r.HandleFunc("/api/postRoutine", controllers.PostRoutine).Methods("POST")
	r.HandleFunc("/api/delRoutine", controllers.DelRoutine).Methods("DELETE")
	r.HandleFunc("/api/putRoutine", controllers.PutRoutine).Methods("PUT")
	*/
	//Para los ejercicios, get post put y un add para rutina
	r.HandleFunc("/api/getExercise", controllers.GetExercise).Methods("GET")
	r.HandleFunc("/api/postExercise", controllers.PostExercise).Methods("POST")
	//r.HandleFunc("/api/delExercise", controllers.DelExercise).Methods("DELETE")
	//r.HandleFunc("/api/putExercise", controllers.PutExercise).Methods("PUT")

	log.Println(http.ListenAndServe(":8080", r))

}
