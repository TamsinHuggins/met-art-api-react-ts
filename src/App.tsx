import { useState, useEffect } from "react";
import { fetchDepartments } from "./api/departments";

import type { Department } from "./types/met";
import "./App.css";
import Artwork from "./components/Artwork";
import { fetchAllArtworkIds } from "./api/artworkOfTheDay";
import ArtworkOfTheDay from "./components/ArtworkOfTheDay";

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDepartments()
      .then((depts) => {
        setDepartments(depts);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to fetch departments");
        setLoading(false);
      });
  }, []);

  return (
    <main className="app-container">
      <section>
        <h1>The Metropolitan Museum of Art</h1>

        <ArtworkOfTheDay />

        <h3> Departments</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <ul>
            {departments.map((dept) => (
              <li key={dept.departmentId}>{dept.displayName}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
