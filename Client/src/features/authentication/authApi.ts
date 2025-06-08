import api from "../../api/axios";
import AuthEndpoint from "./authEndpoint";

const authApi = {
  async login(email: string, password: string): Promise<string> {
    const response = await api.post(AuthEndpoint.login, {
      email,
      password,
    });
    return response.data.data.user.role;
  },
  async register(userData: { email: string; password: string }): Promise<void> {
    console.log("Registering user with data:", userData);
    const reponse = await api.post(AuthEndpoint.register, userData);
    console.log("Register response:", reponse.data);
    return reponse.data;
  },
};
export default authApi;
