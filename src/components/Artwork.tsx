import { useEffect, useState } from "react";
import {
  getRandomArtworkId,
  fetchOneArtwork,
  fetchOneArtworkWithImage,
} from "../api/artworkOfTheDay";
import type { ArtPiece } from "../types/met";
import "./Artwork.css";

function Artwork() {
  const [artwork, setArtwork] = useState<ArtPiece | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const cached = localStorage.getItem("imageOfTheDay");
    const cachedDate = localStorage.getItem("imageOfTheDayDate");

    if (cached && cachedDate === today) {
      setArtwork(JSON.parse(cached));
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

  return (
    <div>
      <img src={artwork.primaryImage} alt={artwork.title} />
      <h2>{artwork.title}</h2>
      <p>{artwork.artistDisplayName}</p>
      <p>{artwork.department}</p>
      <p>{artwork.objectName}</p>
    </div>
  );
}

export default Artwork;
