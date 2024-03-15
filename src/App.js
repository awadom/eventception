import React, { useEffect, useState } from "react";

function generateCards(data) {
  const cards = [];

  for (const section in data) {
    const businesses = data[section].businesses.map((business, index) => (
      <div key={index} className="business-card">
        <div>
          <BusinessDetails business={business} />
        </div>
      </div>
    ));

    const capitalizedSection =
      section.charAt(0).toUpperCase() + section.slice(1);

    // Separate card for section header (H2)
    cards.push(
      <div key={section} className="card">
        <h2>{capitalizedSection}</h2>
        {businesses}
      </div>
    );
  }

  return cards;
}

const BusinessDetails = ({ business }) => {
  const { image_url, name, rating, review_count, categories, location, display_phone, url } = business;

  return (
    <table width="100%" height="auto" background={image_url} cellpadding="5" cellspacing="0" style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td valign="bottom" style={{ padding: "15px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <p style={{ fontSize: "1.2rem", color: "#ffffff", margin: 0 }}><b>{name}</b></p>
            <p style={{ color: "#ffffff", margin: "5px 0 0" }}><b>Rating:</b> {rating}</p>
            <p style={{ color: "#ffffff", margin: "5px 0 0" }}><b>Review Count:</b> {review_count}</p>
          </td>
        </tr>
        <tr>
          <td style={{ padding: "15px", backgroundColor: "#f9f9f9" }}>
            <p><b>Categories:</b> {categories.map(category => category.title).join(", ")}</p>
            <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "10px" }}><b>Address:</b> {location.display_address.join(", ")}</p>
            <p><b>Phone:</b> {display_phone}</p>
            <p style={{ marginTop: "10px" }}><a href={url} target="_blank" style={{ textDecoration: "none", color: "#007bff" }} rel="noreferrer">Visit Yelp Page</a></p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Menu = ({ handleCheckboxChange, handleRefresh }) => {
  return (
    <div className="menu">
      <label>
        <input type="checkbox" name="venue" onChange={handleCheckboxChange} />
        Venue
      </label>
      <label>
        <input type="checkbox" name="food" onChange={handleCheckboxChange} />
        Food
      </label>
      <label>
        <input type="checkbox" name="games" onChange={handleCheckboxChange} />
        Games
      </label>
      <label>
        <input type="checkbox" name="photo Booth" onChange={handleCheckboxChange} />
        Photo Booth
      </label>
      <label>
        <input type="checkbox" name="planner" onChange={handleCheckboxChange} />
        Event Planner
      </label>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};


function App() {
  const [emailName, setEmailName] = useState(""); // State to store email name
  const [zip, setZip] = useState(""); // State to store zip code
  const [range, setRange] = useState(""); // State to store range
  const [cards, setCards] = useState([]);


  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    // Check if the code is running in a browser environment
    if (typeof window !== "undefined") {
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
            if (isMounted && data && data.length > 0) {
              const payload = JSON.parse(data[0].Payload);
              const email =
                data[0]["Please enter your email to receive a response."];
              const zip = data[0]["What is your zip code?"];
              const range =
                data[0][
                  "How far from your location can this venue be? (in miles)"
                ];
              setEmailName(email); // Set emailName state
              setZip(zip); // Set zip state
              setRange(range); // Set range state
                // Initialize checked state for each business
              setCards(generateCards(payload)); // Set cards state
            } else {
              console.log("No data found for the given ID.");
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }

    // Cleanup function to cancel API call when component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="App">
      <h1>Hi, {emailName}</h1>
      <Menu />
      {cards}
    </div>
  );
}

export default App;
