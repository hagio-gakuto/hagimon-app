export type UserRole = "user" | "admin" | "master";

export type Gender = "male" | "female" | "other";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  imageUrl?: string;
};

export type UserResponseDto = {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender | null;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export type UserListResponseDto = {
  users: UserResponseDto[];
  total: number;
  page: number;
  pageSize: number;
};
