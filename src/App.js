import React, { useEffect, useState } from "react";

function generateCards(data) {
  const cards = [];

  for (const section in data) {
    const businesses = data[section].businesses.map((business, index) => (
      <div key={index} className="business-card">
        <h3>{business.name}</h3>
        <img src={business.image_url} alt={business.name} />
        <p>Rating: {business.rating}</p>
        <p>Review Count: {business.review_count}</p>
        {/* Add more details you want to display */}
      </div>
    ));

    cards.push(
      <div key={section} className="card">
        <h2>{section}</h2>
        {businesses}
      </div>
    );
  }

  return cards;
}

function App() {
  const [emailName, setEmailName] = useState(""); // State to store email name
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Extracting the ID parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const submissionID = urlParams.get("ID");

    if (submissionID) {
      // Fetching data based on the Submission ID
      fetch(
        `https://sheetdb.io/api/v1/cdgmxgjxfvt4d/search?Submission%20ID=${submissionID}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer l20nmnivewlxfegfhu95uktazs59llx6inaw0j0h",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Extracting the Payload and Email for the given Submission ID
          if (data && data.length > 0) {
            const payload = JSON.parse(data[0].Payload);
            const email = data[0]["Please enter your email to receive a response."];
            setEmailName(email); // Set emailName state
            setCards(generateCards(payload)); // Set cards state
          } else {
            console.log("No data found for the given ID.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="App">
      {/* No need for a button as data fetching is automatic on component mount */}
      <h1>Hi, {emailName}</h1>
      {cards}
    </div>
  );
}

export default App;
