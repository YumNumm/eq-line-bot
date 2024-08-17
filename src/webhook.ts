import * as line from "@line/bot-sdk";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./schema";
import { Bindings } from "./global";
import epicenter from "../epicenter.csv";

export const textEventHandler = async (
  client: line.messagingApi.MessagingApiClient,
  event: line.WebhookEvent,
  env: Bindings
): Promise<void> => {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_KEY);

  const { replyToken, message: { text } = {} } = event;

  const handler = new LineBotTextMessageHandler();
  switch (text) {
    case "最近の地震履歴":
      await handler.onEarthquakeHistoryTextMessage(
        client,
        replyToken,
        supabase
      );
      break;
    default:
      await handler.onUnknownTextMessage(client, replyToken);
      break;
  }
  return;
};

class LineBotTextMessageHandler {
  async onUnknownTextMessage(
    client: line.messagingApi.MessagingApiClient,
    replyToken: string
  ): Promise<void> {
    const response: line.messagingApi.FlexMessage = {
      type: "flex",
      altText: "This is a Flex Message",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "button",
              action: {
                type: "message",
                label: "最近の地震履歴を確認する",
                text: "最近の地震履歴",
              },
              style: "primary",
            },
          ],
        },
      },
    };

    const replyMessageRequest: line.messagingApi.ReplyMessageRequest = {
      replyToken: replyToken,
      messages: [response],
    };

    await client.replyMessage(replyMessageRequest);
  }

  async onEarthquakeHistoryTextMessage(
    client: line.messagingApi.MessagingApiClient,
    replyToken: string,
    supabase: SupabaseClient<Database>
  ): Promise<void> {
    const { data, error } = await supabase
      .from("earthquake")
      .select("*")
      .order("origin_time", { ascending: false, nullsFirst: false })
      .limit(5);
    if (error) {
      throw error;
    }

    const epicentersBinary = new TextDecoder().decode(epicenter);
    const epicenters = epicentersBinary.split("\n").map((line) => {
      const [code, name] = line.split(",");
      return { code, name };
    });
    console.log(epicenters);
    const earthquakeHistory = data.map((earthquake) => {
      const epicenter = epicenters.find(
        (epicenter) => epicenter.code === earthquake.epicenter_code?.toString()
      );
      return {
        ...earthquake,
        epicenter_name: epicenter?.name,
      };
    });

    const messages: line.messagingApi.FlexMessage = {
      type: "flex",
      altText: "This is a Flex Message",
      contents: {
        type: "carousel",
        contents: earthquakeHistory.map((earthquake) => {
          const isBackgroundDark =
            earthquake.max_intensity === "0" ||
            earthquake.max_intensity === "1";
          const textColor = isBackgroundDark ? "#000000" : "#FFFFFF";
          const regions = earthquake.intensity_regions as {
            code: string;
            name: string;
            maxInt: Database["public"]["Enums"]["jma_intensity"];
          }[];
          const carousel: line.messagingApi.FlexBubble = {
            type: "bubble",
            size: "mega",
            header: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: `${earthquake.epicenter_name}`,
                  size: "lg",
                  color: textColor,
                },
                {
                  type: "text",
                  text: `M ${earthquake.magnitude} 深さ${earthquake.depth}km`,
                  color: textColor,
                  align: "start",
                  size: "md",
                  gravity: "center",
                  margin: "lg",
                },
                {
                  type: "text",
                  text: `発生時刻: ${earthquake.origin_time?.slice(0, 19)}`,
                  size: "sm",
                  color: textColor + "BB",
                },
              ],
              backgroundColor:
                jmaIntensityToColor(earthquake.max_intensity ?? "0") + "AA",
              paddingTop: "19px",
              paddingAll: "12px",
              paddingBottom: "16px",
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "神奈川県",
                      color: "#8C8C8C",
                      size: "sm",
                      wrap: true,
                      weight: "bold",
                      contents: regions
                        .map((regions) => {
                          const l: line.messagingApi.FlexSpan[] = [
                            {
                              type: "span",
                              text: `${regions.name} `,
                              weight: "bold",
                            },
                            {
                              type: "span",
                              text: `震度${regions.maxInt} \n`,
                              weight: "regular",
                            },
                          ];
                          return l;
                        })
                        .flat(),
                    },
                  ],
                  flex: 1,
                },
              ],
              spacing: "md",
              paddingAll: "12px",
            },
            styles: {
              footer: {
                separator: false,
              },
            },
          };
          return carousel;
        }),
      },
    };

    const replyMessageRequest: line.messagingApi.ReplyMessageRequest = {
      replyToken: replyToken,
      messages: [messages],
    };

    await client.replyMessage(replyMessageRequest);
  }
}

function jmaIntensityToColor(
  intensity: Database["public"]["Enums"]["jma_intensity"]
): string {
  // まあまあ、雑に気象庁震度配色を使ってみますかね
  switch (intensity) {
    case "0": {
      return "#FFFFFF";
    }
    case "1": {
      // 242,242,255
      return "#F2F2FF";
    }
    case "2": {
      // 0,170,255
      return "#00AAFF";
    }
    case "3": {
      // 0,65,255
      return "#0041FF";
    }
    case "4": {
      // 250,230,150
      return "#FAE696";
    }
    case "5-":
    case "!5-": {
      // 255,230,0
      return "#FFE600";
    }
    case "5+": {
      // 255,153,0
      return "#FF9900";
    }
    case "6-": {
      // 255,40,0
      return "#FF2800";
    }
    case "6+": {
      // 165,0,33
      return "#A50021";
    }
    case "7": {
      // 180,0,104
      return "#B40068";
    }
  }
}
