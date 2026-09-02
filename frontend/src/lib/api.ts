import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ===== Users =====
export interface User {
  userId?: number;
  name: string;
  email: string;
}

export const userApi = {
  create: (data: User) => api.post<User>("/users", data),
  getAll: () => api.get<User[]>("/users"),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  update: (id: number, data: User) => api.put<User>(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};

// ===== Profiles =====
export interface Profile {
  profileId?: number;
  user?: User;
  age: number;
  gender: string;
  city: string;
  education?: string;
  occupation?: string;
  about?: string;
}

export const profileApi = {
  create: (userId: number, data: Omit<Profile, "profileId" | "user">) =>
    api.post<Profile>(`/profiles/user/${userId}`, data),
  getAll: () => api.get<Profile[]>("/profiles"),
  getById: (id: number) => api.get<Profile>(`/profiles/${id}`),
  getByUserId: (userId: number) => api.get<Profile>(`/profiles/user/${userId}`),
  search: (params: { gender?: string; city?: string; age?: number }) =>
    api.get<Profile[]>("/profiles/search", { params }),
  update: (id: number, data: Partial<Profile>) =>
    api.put<Profile>(`/profiles/${id}`, data),
  delete: (id: number) => api.delete(`/profiles/${id}`),
};

// ===== Interests =====
export interface Interest {
  interestId?: number;
  sender?: User;
  receiver?: User;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export const interestApi = {
  send: (senderId: number, receiverId: number) =>
    api.post<Interest>("/interests/send", { senderId, receiverId }),
  getSent: (userId: number) => api.get<Interest[]>(`/interests/sent/${userId}`),
  getReceived: (userId: number) =>
    api.get<Interest[]>(`/interests/received/${userId}`),
  accept: (id: number) => api.put<Interest>(`/interests/${id}/accept`),
  reject: (id: number) => api.put<Interest>(`/interests/${id}/reject`),
  delete: (id: number) => api.delete(`/interests/${id}`),
};

export default api;
