package structmodels

type NewMeal struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Calories    int    `json:"calories"`
	Proteins    int    `json:"proteins"`
	Fats        int    `json:"fats"`
	Carbs       int    `json:"carbs"`
	PhotoURL    string `json:"photo_url"`
}
type Meal struct {
	ID int `json:"id"`
	NewMeal
}
