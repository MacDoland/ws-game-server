const url = "ws://localhost:8080";
const connection = new WebSocket(url);

connection.onopen = () => {
  const exampleMessage = {
    message: "example",
    payload: {
      name: "joe",
    },
  };
  const serialisedMessage = JSON.stringify(exampleMessage);
  const encodedMessage = atob(serialisedMessage);

  connection.send(encodedMessage);
};

connection.onmessage = (e) => {
  console.log(e.data);
};
