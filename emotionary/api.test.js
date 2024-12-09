import { fetchUsers, fetchMedia, fetchEmotions } from "./api/api";

test("fetchUsers fetches users correctly", async () => {
  const users = await fetchUsers();
  expect(users.length).toBeGreaterThan(0);
});

test("fetchMedia fetches media correctly", async () => {
  const media = await fetchMedia();
  expect(media.length).toBeGreaterThan(0);
});

test("fetchEmotions fetches emotions correctly", async () => {
  const emotions = await fetchEmotions();
  expect(emotions.length).toBeGreaterThan(0);
});
