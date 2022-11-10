import { encryptText } from "../encrypt";

describe("encrypt", () => {
  it("should encrypt text", () => {
    const encrypted = encryptText("hello world");
    // expect encrypted text to be base64 encoded string
    expect(encrypted).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
  });
});