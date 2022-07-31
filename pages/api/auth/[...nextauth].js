import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  //การใส่ CredentialsProvider เพื่อที่จะสามารถเรียก API เพื่อที่จะเช็ค user password เล้วก็จะสามารถ login ได้
  providers: [
    CredentialsProvider({
      //ชื่อที่จะแสดงบนแบบฟอร์ม
      name: "Credentials",
      // สามารถระบุฟิลด์ใดก็ได้ที่คุณต้องการส่ง เช่น โดเมน ชื่อผู้ใช้ รหัสผ่าน โทเค็น 2FA
      // สามารถส่งแอตทริบิวต์ HTML ใดๆ ไปยังแท็ก <input> ผ่านวัตถุได้

      //หน้า login
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // ใช้อ็อบเจ็กต์ `req` เพื่อรับพารามิเตอร์เพิ่มเติม

        //ใส่ url ตรงนี้เพื่อเป็นการเรียก api
        const res = await fetch("https://www.mecallapi.com/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        // เช็คว่า status = ok ข้อมูลถูกต้อง ส่ง user ไป  user ที่เป็น oject อยู่ภายใต้ data
        if (data.status == "ok") {
          return data.user;
        }
        // คืนค่า null หากไม่สามารถดึงข้อมูลผู้ใช้ได้
        return null;
      },
    }),
  ],
  //ตัว secret ใช้ในการ end code
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",

  //เมื่อมีการ signin เสร็จ จะมีการแก้ไขค่าของ token
  callbacks: {
    // jwt จะเกิดจากการที่มีการ signin จะมีการเจ็น token ขึ้นมา
    async jwt({ token, user, account }) {
      // เพิ่ม user เข้ามา ก็จะมีข้อมูลของ user เข้ามา
      
      if (account) {
        token.accessToken = account.access_token;
        token.user = user; //save ข้อมูล user เข้าไปใน token
      }
      return token;
    },
    async session({ session, token, user }) {
      // ส่งคุณสมบัติไปยัง client
      session.accessToken = token.accessToken;
      session.user = token.user; // เอาค่าจาก token ที่เป็น user save เข้าไปที่ user ของ session
      return session; //จากนั้นก็จะเพิ่มข้อมูลของ user เข้าไปได้
    },
  },
});
