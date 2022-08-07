import { screen, cleanup } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "@/utils/test-util";
import LatestUsersPage from "@/pages/users/latest";
import { API_URL } from "@/services/api";

const server = setupServer();

const users = [
  { id: 1, email: "foo@example.com" },
  { id: 2, email: "bar@example.com" },
  { id: 3, email: "baz@example.com" },
];

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("Latest Users", () => {
  it("ユーザー一覧の表示", async () => {
    server.use(rest.get(API_URL + "/users", (req, res, ctx) => res(ctx.status(200), ctx.json({ data: users }))));
    renderWithProviders(<LatestUsersPage />);
    const items = (await screen.findAllByRole("listitem")).map((x) => x.textContent);
    const expected = users.map((x) => x.id + ":" + x.email);
    expect(items).toEqual(expected);
  });
});
