import { Buffer } from "buffer";
export default function decode64(dato) {
    return Buffer.from(dato, "base64").toString("utf8");
}
