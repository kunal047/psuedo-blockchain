import { decryptText } from "../decrypt";

describe("decrypt", () => {
  it("should decrypt text", () => {
    const encryptedText = "pgOvSDCehoBM/Z8VxtvD8GdqnTu8I2Hsz02soPj2A3hNlZO5vQH3j1THkBbUsw60Z8H9qsw5Iftr0ZlJntTLd6Mt5CR/JZQsfrLmbX/+nbtwyUlXYzdhJdo8rD4pb1Be9v4AN8jQf3cTeSXND3bBzs5jS6jVgNoGGZKIUFqbWzbTHd4UJ/7dRuGSgeuNQiAYtpRuKorn+EPKw1V2EbE5Si4JYVHoNUkZ1XX2OkjP+ccCHYq1qpahd8kKDmOC8OrZCX4KzdknnFp2G2MIx/1zVpGB8OqXxzQmEf3/4cPzGIu7jUfbszie6NJlAKFCLz8uudMau1LXU7guTi1YwfqEohYYJ1ipBQNTCQ+EJ3iUtzy6M6WUf+amfjf0/62pKSsWguj1WoJNXTGcgcDW5J2tApcmQ1GxanTAm+9OOUiqNEdQrA0R3vr7OoN6JQBKJISFT49JIkrHY7nfVrTLL99zkFf1Vz6P3vMTxGStV3l/yQswoNIZAvSUS0t58PaG7VLafm6fUZeBKWnNni6981oywlUPTtylMFa33QiNw0MD8xjGtvvgld9uyZPd5syC4+8OJVugLnclhZKLqQiIRW6LbS3DMevQJm3mF1uVq53JZ3G7CG3FoGRYKvb3iz0SQjthFVwAcUMAdr4n9DtRBRf5rA3h54uxgOK5s2P5R943UQs=+Xr6YpL+YrZ8t7Zwzv+1gj0cJG9XW7Mh1vZgkYBk0Yf8+ZQ2dZ5z5g5cJnI8Hn5j5yY6Y1cJYhQ==";
    const decryptedText = decryptText(encryptedText);
    const decryptedJSON = JSON.parse(decryptedText);
    
    expect(typeof decryptedJSON).toBe('object');
    expect(decryptedJSON).toHaveProperty('message');
    expect(decryptedJSON).toHaveProperty('publicKey');
    expect(typeof decryptedJSON.message).toBe('string');
    expect(decryptedJSON.publicKey).toMatch(/^0x[0-9a-fA-F]{40}$/);
  });
});