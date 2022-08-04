import { screen, cleanup } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createRequest, createResponse } from "node-mocks-http";

import UserPage, { getServerSideProps } from "@/pages/users/[id]";
import { renderWithProviders } from "@/utils/test-util";
import { API_URL } from "@/services/api";

const server = setupServer();

const user = { id: 1, email: "foo@example.com" };

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("User Page", () => {
  it("ユーザー詳細の表示", async () => {
    server.use(rest.get(API_URL + "/users/1", (req, res, ctx) => res(ctx.status(200), ctx.json({ data: user }))));
    let context = {
      query: {},
      params: { id: "1" },
      req: createRequest(),
      res: createResponse(),
      resolvedUrl: "",
    };
    let res = await getServerSideProps(context);
    renderWithProviders(<UserPage {...res.props} />);
    expect(screen.getByText(`${user.id}:${user.email}`)).toBeInTheDocument();
  });
});
