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
    return { data: collections, total };
  }

  static async getOneCollection(name) {
    const response = await axios.get(
      `${ApiService.apiBase}/collections/${name}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data[0];
  }

  static async getItemsInCollection(collectionName) {
    const response = await axios.get(
      `${ApiService.apiBase}/items/by-collection/${collectionName}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
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

  static async deleteCollection(collectionName) {
    await axios.delete(`${ApiService.apiBase}/collections/${collectionName}`, {
      name: collectionName,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  static async updateCollection(updatedData, id) {
    await axios.patch(
      `${ApiService.apiBase}/collections/${id}`,
      { ...updatedData },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  }

  static async createCollection(data) {
    const response = await axios.post(
      `${ApiService.apiBase}/collections`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    return response.data;
  }
}

export default ApiService;
