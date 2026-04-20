import { useEffect, useState } from "react";
import { fetchOneArtworkWithImage } from "../api/artworkOfTheDay";
import type { ArtPiece } from "../types/met";
import "./Artwork.css";
import Artwork from "./Artwork";

function ArtworkOfTheDay() {
  const [artwork, setArtwork] = useState<ArtPiece | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const cached = localStorage.getItem("imageOfTheDay");
    const cachedDate = localStorage.getItem("imageOfTheDayDate");

    if (cached && cachedDate === today) {
      const parsed = JSON.parse(cached);
      setArtwork(parsed);
      setLoading(false);
    } else {
      (async () => {
        setLoading(true);
        const artPiece: ArtPiece = await fetchOneArtworkWithImage();
        setArtwork(artPiece);
        localStorage.setItem("imageOfTheDay", JSON.stringify(artPiece));
        localStorage.setItem("imageOfTheDayDate", today);
        setLoading(false);
      })();
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!artwork) return null;

  console.log("Artwork passed to component:", artwork);
  return (
    <div>
      <h2>Artwork of the Day</h2>
      <Artwork art={artwork} />
    </div>
  );
}

export default ArtworkOfTheDay;
