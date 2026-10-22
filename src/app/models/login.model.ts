// Data we send to the API (matches LoginDTO in C#)
export interface LoginModel {
  email: string;
  password: string;
}

// Data the API sends back (matches UserResponseDTO in C#)
export interface UserResponse {
  id: number;
  fullname: string;
  dni: string;
  email: string;
  role: number;
  token: string | null;
}
