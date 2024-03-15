import React, { useEffect, useState } from "react";

// Function to call Yelp API
async function callYelpAPI(term, radius, yelpZip) {
  try {
    // Replace 'YOUR_YELP_API_KEY' with your actual Yelp API key
    const apiKey = '8cYKM3KqWWysRtcTzbKqnJ8WQ6RLU3kaFxySgGkxCjkg-e6nxIlfK_8x9UcprgdGb89ePmkrXB1JVkbEemQC6YlrtsLjYL66hTaO3LyqU5fL-EPNA8QDiY4LcyKkZXYx';
    
    // Yelp API endpoint for business search
    const apiUrl = `https://api.yelp.com/v3/businesses/search?location=${yelpZip}&term=${term}&radius=${radius}&limit=3`;

    // Set up headers with API key
    const headers = {
      'Authorization': 'Bearer ' + apiKey
    };

    // Make the Yelp API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: headers
    });

    // Parse the JSON response
    const responseData = await response.json();

    return responseData;

  } catch (error) {
    console.error("Error calling Yelp API for term '" + term + "': " + error);
    return null;
  }
}

function generateCards(data) {
  const cards = [];

  for (const section in data) {
    // Check if data[section] and data[section].businesses are defined
    if (data[section] && data[section].businesses) {
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
        <input type="checkbox" name="photoBooth" onChange={handleCheckboxChange} />
        Photo Booth
      </label>
      <label>
        <input type="checkbox" name="planner" onChange={handleCheckboxChange} />
        Planner
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
  const [filters, setFilters] = useState({
    venue: false,
    food: false,
    games: false,
    photoBooth: false,
    planner: false
  });

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
                function generateCards(data) {
  const cards = [];

  for (const section in data) {
    // Check if data[section] and data[section].businesses are defined
    if (data[section] && data[section].businesses) {
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
  }

  return cards;
}

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
    }

    // Cleanup function to cancel API call when component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures the effect runs only once

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  const handleRefresh = async () => {
    // Prepare parameters for Yelp API call based on selected filters
    const selectedFilters = Object.keys(filters).filter(key => filters[key]);
    const yelpData = {};

    // Call Yelp API for each selected filter
    for (const filter of selectedFilters) {
      const term = filter;
      const radius = range; // Specify your desired radius in meters
      const yelpZip = zip; // Specify your desired ZIP code
      const response = await callYelpAPI(term, radius, yelpZip);
      yelpData[filter] = response;
    }

    // Update the cards based on Yelp API response
    setCards(generateCards(yelpData));
  };

  return (
    <div className="App">
      <h1>Hi, {emailName}</h1>
      <Menu handleCheckboxChange={handleCheckboxChange} handleRefresh={handleRefresh} />
      {cards}
    </div>
  );
}

export default App;
