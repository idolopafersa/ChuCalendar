package driver

import (
	structmodels "backendgo/StructModels"
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

func OpenDB() {

	dbdirection := fmt.Sprintf("%s:%s@tcp(localhost:3306)/FitCalendar", os.Getenv("usuariodb"), os.Getenv("passdb"))
	var err error
	db, err = sql.Open("mysql", dbdirection)

	fmt.Println("connecting to... %s", dbdirection)
	if err != nil {
		pp := fmt.Sprintf("Couldn't open database.... %s", err)
		panic(pp)
	}

	// Ping the database to check if the connection is successful
	if err := db.Ping(); err != nil {
		log.Println(err)
		panic("Not opened")
	}
	fmt.Println("Connected to MariaDB!")

}

func CloseDB() {
	if db != nil {
		db.Close()
	} else {
		log.Println("Couldnt close database")
	}
}

func CreateUser(username, email, password string) int {

	passwordh, err := hashPassword(password)
	if err != nil {
		log.Println("Couldnt hash password: %s", password)
		return 1
	}

	query := "INSERT INTO Users (username, email,password_hash) VALUES (? , ? , ?)"
	resul, err := db.Exec(query, username, email, passwordh)

	if err != nil {
		log.Println(resul, err)
		return 1
	} else {
		return 0
	}

}

func UserExists(username string) bool {
	var user string

	query := "SELECT username FROM Users WHERE username = ?"

	// Query the database for the user and scan the result into the user struct
	err := db.QueryRow(query, username).Scan(&user)

	if err != nil {
		if err == sql.ErrNoRows {

			return false
		}
		log.Println("Error fetching user: %v\n", err)
		return false
	}

	return true
}

func CorrectPassword(username, password string) bool {
	var aldb []byte
	query := ("SELECT password_hash FROM Users WHERE username = ?")
	fmt.Println(username)
	fmt.Println(password)
	db.QueryRow(query, username).Scan(&aldb)

	if err := bcrypt.CompareHashAndPassword(aldb, []byte(password)); err != nil {
		fmt.Println(err)
		return false
	} else {
		return true
	}

}

func hashPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashed), err
}

func GetMeal(name string) (structmodels.Meal, error) {
	var meal structmodels.Meal
	query := "SELECT * FROM Meals WHERE name = ?"

	err := db.QueryRow(query, name).Scan(&meal.ID, &meal.Name, &meal.Description, &meal.Calories, &meal.Proteins, &meal.Fats, &meal.Carbs, &meal.PhotoURL)
	fmt.Print(err)
	return meal, err

}

func PostMeal(nmeal structmodels.NewMeal) (int, error) {
	query := "INSERT INTO Meals (name, description, calories, proteins, fats, carbs, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?)"
	result, err := db.Exec(query, nmeal.Name, nmeal.Description, nmeal.Calories, nmeal.Proteins, nmeal.Fats, nmeal.Carbs, nmeal.PhotoURL)
	if err != nil {
		fmt.Print(err)
		return 0, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		fmt.Print(err)
		return 0, err
	}

	return int(id), nil

}

func DelMeal(name string) error {
	query := "DELETE FROM Meals WHERE name = ?"
	_, err := db.Exec(query, name)
	fmt.Print(err)
	return err
}

func UpdateMeal(meal structmodels.Meal) error {
	query := `UPDATE Meals SET name = ?, description = ?, calories = ?, proteins = ?, fats = ?, carbs = ?, photo_url = ? WHERE id = ?`

	_, err := db.Exec(query, meal.Name, meal.Description, meal.Calories, meal.Proteins, meal.Fats, meal.Carbs, meal.PhotoURL, meal.ID)
	fmt.Print(err)
	return err
}

func GetExercise(name string) (structmodels.Exercise, error) {
	var resul structmodels.Exercise
	query := "SELECT * FROM Exercises WHERE name = ?"

	err := db.QueryRow(query, name).Scan(resul.ID, resul.RoutineID, resul.Name, resul.Sets, resul.Repetitions, resul.Description, resul.PhotoURL)
	return resul, err
}

func PostExercise(nexercise structmodels.NewExercise) (int, error) {

	query := "INSERT INTO Exercises (routine_id, name, sets, repetitions, description, photo_url) VALUES (?, ?, ?, ?, ?, ?)"
	result, err := db.Exec(query, nexercise.RoutineID, nexercise.Name, nexercise.Sets, nexercise.Repetitions, nexercise.Description, nexercise.PhotoURL)

	if err != nil {
		fmt.Print(err)
		return 0, err
	} else {
		id, _ := result.LastInsertId()
		return int(id), nil
	}
}
