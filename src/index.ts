import { Hono } from "hono";
import { cors } from "hono/cors";
import { Bindings } from "./global";
import { HTTPException } from "hono/http-exception";
import * as line from "@line/bot-sdk";
import { textEventHandler } from "./webhook";

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: "",
    allowMethods: [],
  })
);

app.onError((err, c) => {
  console.error(err.toString());
  console.error(err.stack);
  throw new HTTPException(500, {
    message: "Internal Server Error",
    cause: err.toString(),
  });
});

app.post("/webhook", async (c) => {
  const config: line.ClientConfig = {
    channelAccessToken: c.env.LINE_CHANNEL_ACCESS_TOKEN,
  };

  const client = new line.messagingApi.MessagingApiClient(config);
  line.middleware({
    channelSecret: c.env.LINE_CHANNEL_SECRET,
  });

  const {
    events,
  }: {
    events: line.WebhookEvent[];
  } = await c.req.json();

  for (const event of events) {
    await textEventHandler(client, event, c.env);
  }

  return c.json({ status: "ok" });
});

export default app;
