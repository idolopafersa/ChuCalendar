package structmodels

type Exercise struct {
	ID          int    `json:"id"`
	RoutineID   int    `json:"routine_id"`
	Name        string `json:"name"`
	Sets        int    `json:"sets"`
	Repetitions int    `json:"repetitions"`
	Description string `json:"description"`
	PhotoURL    string `json:"photo_url"`
}

type NewExercise struct {
	RoutineID   int    `json:"routine_id"`
	Name        string `json:"name"`
	Sets        int    `json:"sets"`
	Repetitions int    `json:"repetitions"`
	Description string `json:"description"`
	PhotoURL    string `json:"photo_url"`
}
