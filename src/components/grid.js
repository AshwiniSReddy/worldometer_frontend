// import React from "react";
// import "./grid.css"; // Importing the CSS for styling
// import { useEffect, useState } from "react";

// const Grid = () => {
//   const data = {
//     world_population: "8124159106",
//     births_this_year: "76403535",
//     births_today: "250057",
//     deaths_this_year: "34571792",
//     death_today: "113148",
//     expenditure_healthcare_this_year: "11665966864",
//     expenditure_education_this_year: "7745395678",
//     cars_produced_this_year: "49791344",
//     computers_produced_this_year: "131586843",
//     new_book_titles_published: "1604546",
//     newspaper_circilated_today: "311837913",
//     money_spent_on_vediogames: "223622386",
//     internet_users_today: "6263191949",
//     email_sent_today: "209282564240",
//     google_searches_today: "7570664267",
//     forest_lost_this_year: "2958888",
//     co2_emmision_this_year: "20863605377",
//     overweight_people: "1764570627",
//     obese_people: "866544472",
//     deied_of_hunger: "20825",
//     water_consumed: "2647585563",
//     energy_consumed: "317830957",
//     oil_consumption: "65187118",
//     natural_gas_left: "1066787787933",
//     abortion: "25564960",
//     infection: "45658124",
//     cigerates_smoked: "10307451573",
//     death_caused_by_smoking: "2844049",
//     death_alchol: "1422922",
//     sucide: "610080",
//   };
//   const itemsPerGrid = [5, 4, 3, 3, 2, 3, 4, 4,2,2,2,2,2,2,2]; // Define number of items per grid
//   const dataKeys = Object.keys(data);

//   // Prepare the initial grid data arrays
//   const initialGridData = itemsPerGrid.map((numItems, gridIndex) => {
//     const startIdx = itemsPerGrid
//       .slice(0, gridIndex)
//       .reduce((acc, num) => acc + num, 0);
//     return dataKeys
//       .slice(startIdx, startIdx + numItems)
//       .map((key) => ({ key, value: data[key] }));
//   });

//   const [currentData, setCurrentData] = useState(initialGridData);
//   const [visibleIndexes, setVisibleIndexes] = useState(
//     new Array(itemsPerGrid.length).fill(0)
//   );
//   const [animationState, setAnimationState] = useState("fadin");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setVisibleIndexes((visibleIndexes) =>
//         visibleIndexes.map((idx, i) => (idx + 1) % currentData[i].length)
//       );
//       setAnimationState("fadin");
//     }, 6000); // Change the visible item every 2 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="grid-container">
//       {currentData.map((gridItems, gridIndex) => (
//         <div key={gridIndex} className="grid-item">
//           <div className="grid-center">
//             <div className={`${animationState} `}>
//               {gridItems[visibleIndexes[gridIndex]] && (
//                 <div>
//                   {gridItems[visibleIndexes[gridIndex]].key.replace(/_/g, " ")}:{" "}
//                   {gridItems[visibleIndexes[gridIndex]].value}
//                 </div>

//               )}
              
//             </div>
           
//           </div>
//             <div className="circle">
//             <div className="dot"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Grid;
import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as GridSVG } from '../images/Component.svg'; // Ensure the SVG file is properly imported
import "./grid.css"; // Importing the CSS for styling

const Grid = () => {
  const dummyData = {
    World_population: "Loading...",
    Births_this_year: "Loading...",
    Births_today: "Loading...",
    Deaths_this_year: "Loading...",
    Death_today: "Loading...",
    Healthcare_expenditure_this_year: "Loading...",
    Education_expenditure_this_year: "Loading...",
    Cars_produced_this_year: "Loading...",
    Computers_produced_this_year: "Loading...",
    New_book_titles_published: "Loading...",
    Newspaper_circulated_today: "Loading...",
    Money_spent_on_vediogames: "Loading...",
    Internet_users_today: "Loading...",
    Email_sent_today: "Loading...",
    Google_searches_today: "Loading...",
    Forest_lost_this_year: "Loading...",
    Co2_emmision_this_year: "Loading...",
    Overweight_people: "Loading...",
    Obese_people: "Loading...",
    Died_of_hunger: "Loading...",
    Water_consumed: "Loading...",
    Energy_consumed: "Loading...",
    Oil_consumption: "Loading...",
    Natural_gas_left: "Loading...",
    Abortion: "Loading...",
    Infection: "Loading...",
    Cigerates_smoked: "Loading...",
    Death_caused_by_smoking: "Loading...",
    Death_caused_by_alchol: "Loading...",
    Sucide: "Loading...",
  };

  const itemsPerGrid = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]; // Define number of items per grid
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false); // State to control fade-out animation
  const dataKeys = Object.keys(data);
  const animationIntervalRef = useRef(null); // Ref to hold the interval ID

  // Initialize grid data
  const initializeGridData = (data) => {
    const dataKeys = Object.keys(data);
    return itemsPerGrid.map((numItems, gridIndex) => {
      const startIdx = itemsPerGrid
        .slice(0, gridIndex)
        .reduce((acc, num) => acc + num, 0);
      return dataKeys
        .slice(startIdx, startIdx + numItems)
        .map((key) => ({ key, value: data[key] }));
    });
  };

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/worldometer_expenditure_view/'); // Replace with your backend URL
      const result = await response.json();

      setFadeOut(true); // Start fade-out animation
      setTimeout(() => {
        setData(result);
        setIsLoading(true); // Start loading to temporarily disable animation
        setCurrentData(initializeGridData(result)); // Reinitialize grid data with new data
        setVisibleIndexes(new Array(itemsPerGrid.length).fill(0)); // Reset visible indexes

        // Clear existing interval and restart it
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }

        // Start the animation interval
        animationIntervalRef.current = setInterval(() => {
          setVisibleIndexes(visibleIndexes =>
            visibleIndexes.map((idx, i) => (idx + 1) % currentData[i].length)
          );
        }, 4000); // Change text every 4 seconds to match the animation cycle

        // Delay setting isLoading to false to ensure text updates at the start of the next cycle
        setTimeout(() => {
          setIsLoading(false);
          setFadeOut(false); // End fade-out animation and start fade-in
        }, 100); // Slightly delay to trigger fade-in after fade-out
      }, 900); // Duration of the fade-out animation
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const fetchInterval = setInterval(fetchData, 124000); // Fetch data every 2 minutes (120000 milliseconds)
    return () => {
      clearInterval(fetchInterval); // Clear fetch interval on component unmount
      clearInterval(animationIntervalRef.current); // Clear animation interval on component unmount
    };
  }, []);

  useEffect(() => {
    setCurrentData(initializeGridData(data));
  }, [data]);

  const [currentData, setCurrentData] = useState(initializeGridData(dummyData));
  const [visibleIndexes, setVisibleIndexes] = useState(
    new Array(itemsPerGrid.length).fill(0)
  );

  const gridBoxCoordinates = [
    { x: 2.5, y: 614.5, width: 623.333, height: 571 }, 
    { x: 680.834, y: 614.5, width: 623.333, height: 571 }, 
    { x: 1359.17, y: 614.5, width: 623.333, height: 571 },
    { x: 2.5, y: 1226.5, width: 623.333, height: 571 }, 
    { x: 680.834, y: 1226.5, width: 623.333, height: 571 }, 
    { x: 1359.17, y: 1226.5, width: 623.333, height: 571 },
    { x: 2.5, y: 1838.5, width: 623.333, height: 571 }, 
    { x: 680.834, y: 1838.5, width: 623.333, height: 571 }, 
    { x: 1359.17, y: 1838.5, width: 623.333, height: 571 },
    { x: 2.5, y: 2450.5, width: 623.333, height: 571 }, 
    { x: 680.834, y: 2450.5, width: 623.333, height: 571 }, 
    { x: 1359.17, y: 2450.5, width: 623.333, height: 571 },
    { x: 2.5, y: 3062.5, width: 623.333, height: 571 }, 
    { x: 680.834, y: 3062.5, width: 623.333, height: 571 }, 
    { x: 1359.17, y: 3062.5, width: 623.333, height: 571 }
  ];

  return (
    <div className="grid-container">
      <div className="svg-wrapper">
        {/* Adjusted SVG with explicit viewBox and better text positioning */}
        <svg className="grid-svg" viewBox="0 0 1985 3636">
          {/* Ensure the text is properly centered within the SVG's coordinate system */}
          <text x="992.5" y="100" fill="#333" fontSize="120" fontWeight="bold" textAnchor="middle">
            World at a Glance
          </text>
          <text x="992.5" y="250" fill="#333" fontSize="120" fontWeight="bold" textAnchor="middle">
            Heading for the application
          </text>
          <GridSVG />
          <svg className="text-overlay">
            {currentData && currentData.map((gridItems, gridIndex) => (
              <foreignObject
                key={gridIndex}
                x={gridBoxCoordinates[gridIndex].x}
                y={gridBoxCoordinates[gridIndex].y}
                width={gridBoxCoordinates[gridIndex].width}
                height={gridBoxCoordinates[gridIndex].height}
                className={`grid-text ${fadeOut ? 'fadeout' : !isLoading ? 'fadin' : ''}`}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" className="text-container">
                  <div className="key">{gridItems[visibleIndexes[gridIndex]].value}</div>
                  <div className="value">{gridItems[visibleIndexes[gridIndex]].key.replace(/_/g, " ")}</div>
                </div>
              </foreignObject>
            ))}
          </svg>
        </svg>
      </div>
    </div>
  );
};

export default Grid;
