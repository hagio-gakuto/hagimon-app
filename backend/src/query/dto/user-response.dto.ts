import type { UserRole, Gender } from '../types/user.types';

export class UserResponseDto {
  constructor({
    id,
    email,
    role,
    firstName,
    lastName,
    gender,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
  }: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    gender: Gender | null;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
  }) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender | null;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
