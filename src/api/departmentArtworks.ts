"use strict";

import type { Department, ArtPiece } from "../types/met";

export function getDepartmentFromUrl(): Department {
  const department: Department = {
    departmentId: 0,
    displayName: "Department Not Found",
  };
  const params = new URLSearchParams(window.location.search);
  try {
    department.departmentId = Number(params.get("departmentId"));

    department.displayName = params.get("displayName") as string;
  } catch {
    console.error("failed to assign department");
  }
  return department;
}

export async function fetchArtworkIds(): Promise<number[]> {
  const thisDepartment: Department = getDepartmentFromUrl();
  console.log(thisDepartment);

  const linkURL: string = `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${thisDepartment.departmentId}`;
  const response: Response = await fetch(linkURL);
  const data = await response.json();
  const objectIDs = await data.objectIDs;
  return objectIDs;
}

export async function fetchExpandedArtworkByIndex(chosenIndex: number) {
  const artworkIds = await fetchArtworkIds();
  const firstId = artworkIds[chosenIndex];
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${firstId}`,
  );
  const expandedArtPiece = await response.json();
  return expandedArtPiece;
}

export async function fetchOneArtwork(): Promise<ArtPiece> {
  // loop through indexes in the list of relevant artworks until one with a valid image is found

  const expanded = await fetchExpandedArtworkByIndex(3);

  const artPiece: ArtPiece = {
    objectID: expanded.objectID,
    title: expanded.title,
    artistDisplayName: expanded.artistDisplayName,
    primaryImage: expanded.primaryImage,
    department: expanded.department,
    objectName: expanded.objectName,
  };

  return artPiece;
}

// https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=3

// fetchOneArtwork().then((artwork) => console.log(artwork));

// Commenting out the vanilla js piece

// const pictureFrame = document.getElementById("frame");
// const imgEl = document.createElement("img");
// imgEl.src = artPiece.primaryImage;
// imgEl.alt = artPiece.title;
// pictureFrame?.appendChild(imgEl);
