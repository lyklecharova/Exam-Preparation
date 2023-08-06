import { get, post } from "./api.js";

const endpoints = {
  going: "/data/going",
  byEventId: (eventId) =>
    `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
  byEventIdAndUserId: (eventId, userId) =>
    `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function go(eventId) {
  return post(endpoints.going, { eventId });
}

export async function getEvents(eventId) {
  return get(endpoints.byEventId(eventId));
}

export async function getUserEvents(eventId, userId) {
  return get(endpoints.byEventIdAndUserId(eventId, userId));
}