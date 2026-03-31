import type { NextConfig } from "next";

const NODE_BIN = "/Users/brandonherdrick/.nvm/versions/node/v24.14.0/bin";
process.env.PATH = `${NODE_BIN}:${process.env.PATH ?? ""}`;
process.env.NODE = `${NODE_BIN}/node`;

const nextConfig: NextConfig = {};

export default nextConfig;
