import React, { useState, useEffect } from "react";
import testData from "./components/test.json";

function generateCards(data) {
  const cards = [];

  for (const section in data) {
    const businesses = data[section].businesses.map((business, index) => (
      <div
        key={index}
        className="business-card"
        dangerouslySetInnerHTML={{ __html: createHTMLForBusiness(business) }}
      />
    ));

    const capitalizedSection = section.charAt(0).toUpperCase() + section.slice(1); // Capitalize first letter of section

    // Separate card for section header (H1)
    cards.push(
      <div key={section + "-card"} className="section-card">
        <h1 style={{ textAlign: 'center' }}>{capitalizedSection}</h1>
      </div>
    );

    // Card for businesses under the section
    cards.push(
      <div key={section} className="card">
        {businesses}
      </div>
    );
  }

  return cards;
}

function createHTMLForBusiness(business) {
  return `
    <table width="100%" height="auto" background="${business.image_url}" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
        <tr>
            <td valign="bottom" style="padding: 15px; background-color: rgba(0, 0, 0, 0.5);">
                <p style="font-size: 1.2rem; color: #ffffff; margin: 0;"><b>${business.name}</b></p>
                <p style="color: #ffffff; margin: 5px 0 0;"><b>Rating:</b> ${business.rating}</p>
                <p style="color: #ffffff; margin: 5px 0 0;"><b>Review Count:</b> ${business.review_count}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 15px; background-color: #f9f9f9;">
                <p><b>Categories:</b> ${business.categories.map(category => category.title).join(', ')}</p>
                <p style="font-size: 0.9rem; color: #555; margin-top: 10px;"><b>Address:</b> ${business.location.display_address.join(', ')}</p>
                <p><b>Phone:</b> ${business.display_phone}</p>
                <p style="margin-top: 10px;"><a href="${business.url}" target="_blank" style="text-decoration: none; color: #007bff;">Visit Yelp Page</a></p>
            </td>
        </tr>
    </table>
    `;
}

function App() {
  const [emailName, setEmailName] = useState(""); // State to store email name
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Simulate fetching data from test.json
    // For testing purposes only
    const fetchData = () => {
      // You can replace testData with your fetched data later
      const payload = testData;
      const email = "test@example.com"; // Example email for testing
      setEmailName(email); // Set emailName state
      setCards(generateCards(payload)); // Set cards state
    };

    fetchData(); // Call fetchData function

    // You can keep this empty dependency array as this effect should only run once
  }, []);

  return (
    <div className="App">
      <h1>Hi, {emailName}</h1>
      {cards}
    </div>
  );
}

export default App;
