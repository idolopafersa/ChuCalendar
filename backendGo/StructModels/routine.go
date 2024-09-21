package structmodels

type Routine struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	PhotoURL    string `json:"photo_url"`
}

type NewRoutine struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	PhotoURL    string `json:"photo_url"`
}
