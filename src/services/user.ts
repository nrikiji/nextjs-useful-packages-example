import { client } from "@/services/api";
import { Auth, User } from "@/types/user";

interface usersResponse {
  data: User[];
}

interface userResponse {
  data: User;
}

export const fetchUsers = async (): Promise<User[]> => {
  const res = await client.get<usersResponse>("/users");
  return res.data.data;
};

export const fetchUser = async (id: number): Promise<User> => {
  const res = await client.get<userResponse>(`/users/${id}`);
  return res.data.data;
};

export const login = async (email: string, password: string): Promise<Auth> => {
  const res = await client.post<Auth>("/login", { email, password });
  return res.data;
};
