package main

import (
	"fmt"
	"html"
	"net/http"
	"strconv"
	"time"
)

type ControlMessage struct {
	Text string
	Number  uint64
}

func main() {
	// Create controlChannel and statusPollChannel
	controlChannel := make(chan ControlMessage)
	workerCompleteChan := make(chan bool)
	statusPollChannel := make(chan chan bool)

	// Initialize workerActive state
	workerActive := false

	// Start the admin handler
	go admin(controlChannel, statusPollChannel)

	// Specify the server address
	serverAddr := ":3010"
	serverURL := "http://localhost" + serverAddr

	// Standart Output the server start message
	fmt.Printf("Server is started at %s\n", serverURL)

	// Start the server
	go func() {
		err := http.ListenAndServe(serverAddr, nil)
		if err != nil {
			fmt.Printf("Server error: %v\n", err)
		}
	}()

	for {
		select {
		// Receive response from statusPollChannel
		case respChan := <-statusPollChannel:
			respChan <- workerActive

		// Process messages from controlChannel
		case msg := <-controlChannel:
			workerActive = true
			go worker(msg, workerCompleteChan)

		// Receive worker completion status
		case status := <-workerCompleteChan:
			workerActive = status
		}
	}
}

func admin(cc chan ControlMessage, statusPollChannel chan chan bool) {
	// /admin handler
	http.HandleFunc("/admin", func(w http.ResponseWriter, r *http.Request) {
		// Parse request form
		err := r.ParseForm()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Get parameters and send control message
		number, err := strconv.ParseUint(r.FormValue("number"), 10, 32)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		text := r.FormValue("text")
		msg := ControlMessage{
			Text: text,
			Number: number,
		}
		cc <- msg

		// Create response
		fmt.Fprintf(w,"Sent Control message about Text and Number: %s, Number: %d",
			html.EscapeString(r.FormValue("text")),
			number,
		)
	})

	// /status handler
	http.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
		// Send status poll request
		reqChan := make(chan bool)
		statusPollChannel <- reqChan
		timeout := time.After(time.Second)
		select {
		case result := <-reqChan:
			if result {
				fmt.Fprintf(w, "ACTIVE")
			} else {
				fmt.Fprintf(w, "INACTIVE")
			}
		case <-timeout:
			fmt.Fprintf(w, "TIMEOUT")
		}
	})
}

// Worker processing
func worker(msg ControlMessage, cc chan bool) {
	fmt.Printf("Accepted Control message, Text: %s, Number: %d \n", msg.Text, msg.Number)
	cc <- false
}
