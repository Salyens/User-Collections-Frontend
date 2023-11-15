import axios from "axios";

class ApiService {
  static apiBase = process.env.REACT_APP_API_BASE;

  static async registration(userData) {
    const response = await axios.post(
      `${ApiService.apiBase}/users/registration`,
      userData
    );
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  }

  static async login(data) {
    const response = await axios.post(
      `${ApiService.apiBase}/users/login`,
      data
    );
    localStorage.setItem("token", response.data.accessToken);

    return response.status;
  }

  static async get() {
    const data = await axios.get(ApiService.apiBase, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  }

  static async getCollections(page, limit, userPage) {
    let URL = `${ApiService.apiBase}/collections?page=${page}&limit=${limit}`;
    if (userPage)
      URL = `${ApiService.apiBase}/collections/me?page=${page}&limit=${limit}`;

    const response = await axios.get(URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const { collections, total } = response.data;
    console.log(response.data);
    return { data: collections, total };
  }

  static async getItems(page, limit) {
    const response = await axios.get(
      `${ApiService.apiBase}/items?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const { userItems, total } = response.data;
    return { data: userItems, total };
  }

  static async getUserInfo() {
    const data = await axios.get(`${ApiService.apiBase}/users/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  }

  static async delete(ids) {
    await axios.delete(`${ApiService.apiBase}/delete`, {
      data: { idsToDelete: ids },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  static async update(blockStatus, ids) {
    await axios.patch(
      `${ApiService.apiBase}/update`,
      { blockStatus, ids },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  }
}

export default ApiService;
