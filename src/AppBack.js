import React, { useState, useEffect } from "react";
import testData from "./components/test.json";

function App() {
  const [emailName, setEmailName] = useState(""); // State to store email name
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Simulate fetching data from test.json
    // For testing purposes only
    const fetchData = () => {
      // You can replace testData with your fetched data later
      const payload = testData;
      const email = "calvin.hoang@gmail.com"; // Example email for testing
      setEmailName(email); // Set emailName state
      setCards(generateCards(payload)); // Set cards state
    };

    fetchData(); // Call fetchData function

    // You can keep this empty dependency array as this effect should only run once
  }, []);

  const generateCards = (data) => {
    const cardComponents = [];

    for (const section in data) {
      const businesses = data[section].businesses.map((business, index) => (
        <div
          key={index}
          className="business-card"
          draggable
          onDragStart={(e) => handleDragStart(e, section, index)}
        >
          <div dangerouslySetInnerHTML={{ __html: createHTMLForBusiness(business) }} />
        </div>
      ));

      const capitalizedSection = section.charAt(0).toUpperCase() + section.slice(1);

      // Separate card for section header (H1)
      cardComponents.push(
        <div key={section + "-card"} className="section-card">
          <h1 style={{ textAlign: "center" }}>{capitalizedSection}</h1>
        </div>
      );

      // Card for businesses under the section
      cardComponents.push(
        <div key={section} className="card" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, section)}>
          {businesses}
        </div>
      );
    }

    return cardComponents;
  };

  const createHTMLForBusiness = (business) => {
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
                  <p><b>Categories:</b> ${business.categories.map((category) => category.title).join(", ")}</p>
                  <p style="font-size: 0.9rem; color: #555; margin-top: 10px;"><b>Address:</b> ${business.location.display_address.join(", ")}</p>
                  <p><b>Phone:</b> ${business.display_phone}</p>
                  <p style="margin-top: 10px;"><a href="${business.url}" target="_blank" style="text-decoration: none; color: #007bff;">Visit Yelp Page</a></p>
              </td>
          </tr>
      </table>
    `;
  };

  const handleDragStart = (e, section, index) => {
    e.dataTransfer.setData("section", section);
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toSection) => {
    e.preventDefault();
    const fromSection = e.dataTransfer.getData("section");
    const fromIndex = parseInt(e.dataTransfer.getData("index"), 10);
  
    // Prevent dropping the card onto itself
    if (fromSection === toSection) {
      return;
    }
  
    // Find the card being dragged
    const draggedCard = cards.find(card => card.key === `${fromSection}-card`);
  
    if (!draggedCard) {
      return; // Prevent further execution if the dragged card is not found
    }
  
    // Filter out the dragged card from the cards array
    let updatedCards = cards.filter(card => card.key !== `${fromSection}-card`);
  
    // Find the index where the card is dropped
    const toIndex = updatedCards.findIndex(card => card.key === `${toSection}-card`);
  
    // Insert the dragged card at the appropriate index
    updatedCards.splice(toIndex + 1, 0, draggedCard);
  
    // Update the state with the rearranged cards
    setCards(updatedCards);
  };
  
  
  

  return (
    <div className="App">
      <h1>Hi, {emailName}</h1>
      {cards}
    </div>
  );
}

export default App;
