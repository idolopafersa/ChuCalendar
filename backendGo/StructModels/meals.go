package structmodels

type Meal struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Calories    int     `json:"calories"`
	Proteins    float32 `json:"proteins"`
	Fats        float64 `json:"fats"`
	Carbs       float64 `json:"carbs"`
	PhotoURL    string  `json:"photo_url"`
}

type NewMeal struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Calories    int     `json:"calories"`
	Proteins    float32 `json:"proteins"`
	Fats        float64 `json:"fats"`
	Carbs       float64 `json:"carbs"`
	PhotoURL    string  `json:"photo_url"`
}

type MealRequest struct {
	Name string `json:"name"`
}
