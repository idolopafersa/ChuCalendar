package structmodels

import "database/sql"

type Routine struct {
	ID          int            `json:"id"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	PhotoURL    sql.NullString `json:"photo_url"`
}

type NewRoutine struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	PhotoURL    string `json:"photo_url"`
}
