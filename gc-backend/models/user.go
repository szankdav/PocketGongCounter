package models

type User struct {
	Id       string `db:"id" json:"id"`
	Email    string `db:"email" json:"email"`
	Password string `db:"password" json:"password"`
}
