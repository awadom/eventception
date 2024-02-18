import React from "react";

function App() {
  const readGoogleSheet = () => {
    fetch("https://sheetdb.io/api/v1/cdgmxgjxfvt4d", {
      method: 'GET',
      headers: {'Authorization': 'Bearer p5oie4u1hmlyq7xpz3zjfjdmjiamqta2640k3f7l'}
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <button onClick={() => readGoogleSheet()}>Read</button>
    </div>
  );
}

export default App;
