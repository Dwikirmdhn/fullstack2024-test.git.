package main

import (
	"fmt"
	"strings"
)

func main() {
	s := "Go is amazing"
	words := strings.Split(s, " ")
	fmt.Println(len(words))
}
