import type { ArtPiece } from "../types/met";

export async function fetchAllArtworkIds(): Promise<number[]> {
  const linkURL: string = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;
  const response: Response = await fetch(linkURL);
  const data = await response.json();
  console.log(data);
  const objectIDs = await data.objectIDs;
  return objectIDs;
}

export async function getRandomArtworkId(): Promise<number | undefined> {
  const allIds = await fetchAllArtworkIds();
  if (!allIds || allIds.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * allIds.length);
  return allIds[randomIndex];
}

export async function fetchExpandedArtworkByIndex(
  chosenIndex: number | Promise<number | undefined>,
) {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${chosenIndex}`,
  );
  const expandedArtPiece = await response.json();
  return expandedArtPiece;
}

export async function fetchOneArtwork(
  chosenIndex: number | Promise<number | undefined>,
): Promise<ArtPiece | null> {
  const expanded = await fetchExpandedArtworkByIndex(chosenIndex);
  if (expanded.primaryImage !== "") {
    const artPiece: ArtPiece = {
      objectID: expanded.objectID,
      title: expanded.title,
      artistDisplayName: expanded.artistDisplayName,
      primaryImage: expanded.primaryImage,
      department: expanded.department,
      objectName: expanded.objectName,
    };
    return artPiece;
  } else {
    return null;
  }
}

export async function fetchOneArtworkWithImage(): Promise<ArtPiece> {
  let artwork: ArtPiece | null = null;
  while (!artwork) {
    const randomId = await getRandomArtworkId();
    if (randomId !== undefined) {
      artwork = await fetchOneArtwork(randomId);
    }
  }
  return artwork;
}
