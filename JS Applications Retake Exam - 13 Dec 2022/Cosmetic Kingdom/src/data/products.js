import { get, post, put, del } from "./api.js";

const endpoints = {
  catalog: "/data/products?sortBy=_createdOn%20desc",
  byId: "/data/products/",
  create : "/data/products",
};

export async function getAllProducts() {
  return get(endpoints.catalog);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}

export async function createProduct(data) {
  return post(endpoints.catalog, data);
}

export async function updateProduct(id, data) {
  return put(endpoints.byId + id, data);
}

export async function deleteProduct(id) {
  return del(endpoints.byId + id);
}