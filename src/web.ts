(() => {
  const socket = new WebSocket("ws://localhost:1234/graphql");
  socket.onopen = () => {
    console.log("Connected to ws://localhost:1234/graphql");
  }
  socket.onmessage = (event) => {
    console.log("Received message from server", event.data);
  }
  socket.onclose = () => {
    console.log("Disconnected from ws://localhost:1234/graphql");
  }
})();
