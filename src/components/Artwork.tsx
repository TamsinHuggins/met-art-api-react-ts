import type { ArtPiece } from "../types/met";

interface ArtworkProps {
  art: ArtPiece;
}

function Artwork({ art }: ArtworkProps) {
  console.log(art);
  return (
    <div>
      <img src={art.primaryImage} alt={art.title} />
      <h3>{art.title}</h3>
      <p>{art.artistDisplayName}</p>
      <p>{art.department}</p>
      <p>{art.objectName}</p>
    </div>
  );
}

export default Artwork;
