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
	r.HandleFunc("/api/postuser", controllers.CreateUser).Methods("POST")

	//Para las comidas, deberemos hacer un get post  put y remove

	r.HandleFunc("/api/getmeal", controllers.GetMeal).Methods("GET")
	r.HandleFunc("/api/postmeal", controllers.PostMeal).Methods("POST")
	r.HandleFunc("/api/delmeal", controllers.DelMeal).Methods("DELETE")
	r.HandleFunc("/api/putmeal", controllers.PutMeal).Methods("PUT")

	//Para las rutinas, get post put
	r.HandleFunc("/api/getroutine", controllers.GetRoutine).Methods("GET")
	r.HandleFunc("/api/postroutine", controllers.PostRoutine).Methods("POST")
	r.HandleFunc("/api/delroutine", controllers.DelRoutine).Methods("DELETE")
	r.HandleFunc("/api/putroutine", controllers.PutRoutine).Methods("PUT")

	//Para los ejercicios, get post put
	r.HandleFunc("/api/getexercise", controllers.GetExercise).Methods("GET")
	r.HandleFunc("/api/postexercise", controllers.PostExercise).Methods("POST")
	r.HandleFunc("/api/delexercise", controllers.DelExercise).Methods("DELETE")
	r.HandleFunc("/api/putexercise", controllers.PutExercise).Methods("PUT")

	//add,remove and get exercises of a routine

	r.HandleFunc("/api/getroexercises", controllers.GetrExercises).Methods("GET")
	r.HandleFunc("/api/addrexercise", controllers.AddrExercise).Methods("POST")
	r.HandleFunc("/api/delroexercise", controllers.DelrExercise).Methods("DELETE")

	//days handlin

	r.HandleFunc("/api/getday", controllers.Getday).Methods("GET")
	r.HandleFunc("/api/addmeal", controllers.AddMealToDay).Methods("POST")
	log.Println(http.ListenAndServe(":8080", r))

}
