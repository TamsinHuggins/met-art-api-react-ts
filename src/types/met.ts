export interface Department {
  departmentId: number;
  displayName: string;
}

export interface DepartmentsResponse {
  departments: Department[];
}

export interface ArtPiece {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImage: string;
  department: string;
  objectName: string;
}
