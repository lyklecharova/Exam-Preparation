import { get, post } from "./api.js";

const endpoints = {
  bought: "/data/bought",
  byBoughtId: (productId) =>
    `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
  byBoughtIdAndUserId: (productId, userId) =>
    `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function buy(productId) {
  return post(endpoints.bought, { productId });
}

export async function getBought(productId) {
  return get(endpoints.byBoughtId(productId));
}

export async function getUserBought(productId, userId) {
  return get(endpoints.byBoughtIdAndUserId(productId, userId));
}