import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    // Extracting the ID parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const submissionID = urlParams.get("ID");

    if (submissionID) {
      // Fetching data based on the Submission ID
      fetch(
        `https://sheetdb.io/api/v1/58f61be4dda40/search?ID=${"Submission ID"}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer l20nmnivewlxfegfhu95uktazs59llx6inaw0j0h",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Extracting the Payload for the given Submission ID
          if (data && data.length > 0) {
            const payload = data[0].Payload;
            console.log(payload); // You can use the payload data as per your requirement
          } else {
            console.log("No data found for the given ID.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <div className="App">
      {/* No need for a button as data fetching is automatic on component mount */}
      <h1>Data Fetching Example</h1>
    </div>
  );
}

export default App;
