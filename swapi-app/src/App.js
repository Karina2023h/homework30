// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSwapiData, clearSwapiData } from "./actions/swapiActions";
// import "./App.css";

// function App() {
//   const [url, setUrl] = useState("");
//   const dispatch = useDispatch();
//   const swapiData = useSelector((state) => state.swapi.data);
//   const loading = useSelector((state) => state.swapi.loading);
//   const error = useSelector((state) => state.swapi.error);

//   const handleSearch = () => {
//     const id = url.match(/people\/(\d+)/)?.[1];
//     if (id) {
//       dispatch(fetchSwapiData(id));
//     } else {
//       alert("Введите корректную ссылку SWAPI для персонажа.");
//     }
//   };

//   return (
//     <div>
//       <h1>SWAPI</h1>

//       <div className="borg">
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Введіть посилання SWAPI"
//         />
//         <button onClick={handleSearch}>Get info</button>
//       </div>

//       {loading && <p>Загрузка...</p>}
//       {error && <p>Ошибка: {error}</p>}
//       {swapiData && (
//         <div>
//           <p>Name: {swapiData.name}</p>
//           <p>Height: {swapiData.height}</p>
//           <p>Mass: {swapiData.mass}</p>
//           <p>Hair Color: {swapiData.hair_color}</p>
//           <p>Skin Color: {swapiData.skin_color}</p>
//           <p>Eye Color: {swapiData.eye_color}</p>
//           <p>Birth Year: {swapiData.birth_year}</p>
//           <p>Gender: {swapiData.gender}</p>
//           <p>Homeworld: {swapiData.homeworld}</p>
//           <p>Films: {swapiData.films.join(", ")}</p>
//           <p>Species: {swapiData.species.join(", ")}</p>
//           <p>Vehicles: {swapiData.vehicles.join(", ")}</p>
//           <p>Starships: {swapiData.starships.join(", ")}</p>
//           <p>Created: {swapiData.created}</p>
//           <p>Edited: {swapiData.edited}</p>
//           <p>URL: {swapiData.url}</p>
//         </div>
//       )}

//       <footer>
//         <button onClick={() => dispatch(clearSwapiData())}>Clear</button>
//       </footer>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwapiData, clearSwapiData } from "./actions/swapiActions";
import "./App.css"; // Імплементуємо стилі

function App() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("people"); // Додати стан для типу даних
  const dispatch = useDispatch();
  const swapiData = useSelector((state) => state.swapi.data);
  const loading = useSelector((state) => state.swapi.loading);
  const error = useSelector((state) => state.swapi.error);

  const handleSearch = () => {
    const id = url.match(new RegExp(`${type}/(\\d+)/`))?.[1];
    if (id) {
      dispatch(fetchSwapiData(type, id)); // Передати тип у екшен
    } else {
      alert("Введите корректную ссылку SWAPI.");
    }
  };

  return (
    <div className="container">
      <h1 className="app-title">SWAPI</h1>

      <div className="search-container">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="type-select"
        >
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
          <option value="species">Species</option>
        </select>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={`Enter ${type} URL`}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Get info
        </button>
      </div>

      {loading && <p className="loading-text">Загрузка...</p>}
      {error && <p className="error-text">Ошибка: {error}</p>}
      {swapiData && (
        <div className="data-container">
          {Object.keys(swapiData).map((key) => (
            <p key={key} className="data-item">
              <strong>{key.replace("_", " ")}:</strong>{" "}
              {Array.isArray(swapiData[key])
                ? swapiData[key].join(", ")
                : swapiData[key]}
            </p>
          ))}
        </div>
      )}

      <footer className="app-footer">
        <button
          onClick={() => dispatch(clearSwapiData())}
          className="clear-button"
        >
          Clear
        </button>
      </footer>
    </div>
  );
}

export default App;
