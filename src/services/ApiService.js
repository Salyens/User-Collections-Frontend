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

  static async getOneCollection(collectionName) {
    const response = await axios.get(
      `${ApiService.apiBase}/collections/${collectionName}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data[0];
  }

  static async getItemsInCollection(page, limit, collection) {
    const response = await axios.get(
      `${ApiService.apiBase}/items/by-collection/${collection}?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  }

  static async getItems(page, limit, collectionName=null) {
    const response = await axios.get(
      `${ApiService.apiBase}/items?page=${page}&limit=${limit}${collectionName ? `&collectionName=${collectionName}` : ""}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const { userItems, total } = response.data;
    return { data: userItems, total };
  }

  static async getOneItem(itemName) {
    const response = await axios.get(
      `${ApiService.apiBase}/items/${itemName}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data[0];
  }


  static async deleteItems(idsToDelete) {
    await axios.delete(`${ApiService.apiBase}/items`, {
      data: { idsToDelete },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  static async updateItem(updatedData, id) {
    await axios.patch(
      `${ApiService.apiBase}/items/${id}`,
      { ...updatedData },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  }

  static async createItem(data) {
    const response = await axios.post(`${ApiService.apiBase}/items`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return response.data;
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
