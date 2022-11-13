import { Buffer } from "buffer";
export default function encode64(dato) {
  return Buffer.from(dato, "utf8").toString("base64");
}
