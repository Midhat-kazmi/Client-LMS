// src/types.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;       // e.g., "student" | "teacher"
  avatar?: string;     // optional avatar URL
  createdAt?: string;
  updatedAt?: string;
  // Add other fields if needed
}
