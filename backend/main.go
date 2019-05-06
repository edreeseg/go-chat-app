package main

import (
	"fmt"
	"net/http"
	"log"
	"github.com/gorilla/websocket"
)

// We'll need to fine an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,

	// We'll need to check the origin of our connection
	// this will allow us to make requests from our React
	// development server to here.
	// For now, we'll do no checking and just allow any connection.
	// This is the equivalent of using `server.use(cors())` in an Express API.
	CheckOrigin: func(r *http.Request)bool { return true },
}

// Define a reader which will listen for
// new messages being sent to our WebSocket
// endpoint
func reader(conn *websocket.Conn){
	for {
		// Read in a message
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// Print out that message for clarity
		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

// Define our WebSocket endpoint
func serveWs(w http.ResponseWriter, r *http.Request){
	fmt.Println(r.Host)

	// Upgrade this connection to a WebSocket connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	// Listen indefinitely for new messages coming through
	// on our WebSocket connection
	reader(ws)
}

func setupRoutes(){
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprintf(w, "Simple Server")
	})
	// Map our `/ws` endpoint to the `serveWs` function
	http.HandleFunc("/ws", serveWs)
}

func main() {
	fmt.Println("Chat App v0.01")
	setupRoutes()
	log.Fatal(http.ListenAndServe(":8080", nil))
}