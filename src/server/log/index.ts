import type { Collection } from "mongodb";
import { getServerAuthSession } from "../auth";
import { getDB } from "./mongo";
import { env } from "src/env.js";

const mongo = await getDB();
let collection: Collection<LogEvent> | null = null;

if (mongo) {
  collection = mongo.collection<LogEvent>("logs");
}

export enum LogType {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

// Needed for zod validation
export const tagValues = [
  "DATABASE",
  "AUTH",
  "API",
  "ROUTER",
  "CLICKSTREAM",
  "ERROR",
  "FRONTEND",
] as const; // add more tags here
export type Tag = (typeof tagValues)[number];

export interface LogEvent {
  timestamp: string;
  application: "web"; // chat backend will have another value here
  userId?: string;
  logType: LogType;
  message: string;
  additionalInfo?: string;
  tags: Tag[];
}

const logEvent = (props: {
  message: string;
  logType?: LogType;
  additionalInfo?: string;
  tags?: Tag[];
}) => {
  if (env.LOG === "false") return;
  const event: LogEvent = {
    timestamp: new Date().toISOString(),
    application: "web",
    additionalInfo: props.additionalInfo ?? "",
    logType: props.logType ?? LogType.INFO,
    message: props.message,
    tags: props.tags ?? [],
  };
  console.log(event);
  // Do not await this function
  void getServerAuthSession().then((session) => {
    if (session) event.userId = session.user.id;
    if (collection) void collection.insertOne(event);
  });
};

export default logEvent;
