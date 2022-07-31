import Link from "next/link";
import Attractions from "./src/Attractions";
import User from "./src/User";
import Search from "./src/Search";
import { useSession, signIn, signOut } from "next-auth/react";
// signIn signOut เป็นการที่จะไปเรียก ตัว nextauth
// signIn จะไปเรียกหน้า username: password:
// signOut จะเป็นการ logOut ออกมา

export default function Component({ data }) {
  //รับ props มาเป็นตัวแปร data
  //ดึงค่า session มา ถ้าเกิด login ผ่าน จะได้ค่า session กลับมา
  const { data: session } = useSession();
  // session ที่ได้มา ถ้ามี session  ให้ return แสดง email ของ user
  if (session) {
    
    return (
      <div className="bg-gray-800 text-slate-100 text-xl">
        <User />
        <Search/>
        {data.map((attractions) => (
          <Attractions attractions={attractions} />
        ))}
      </div>
    );
  }
  
  //ถ้ายังไม่ได้ login แสดง Not signed in แล้วเมื่อกดปุ่มก้จะไปหน้า signIn
  return (
    <>
      <div className="">
        <span className="text-3xl pt-48 justify-center flex">
          Not signed in{" "}
        </span>{" "}
        <br />
        <div className="justify-center flex">
          <button
            onClick={() => signIn()}
            className="bg-gray-700 rounded-xl text-white w-28 h-10 text-2xl"
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}
//function นี้ถูกเรียกก็ต่อเมื่อตอน build ทำให้ไปดึง API มาใช้ได้
export async function getServerSideProps() {
  // ดึงข้อมูลจาก API  ภายนอก
  const res = await fetch("https://www.mecallapi.com/api/th/attractions");
  const data = await res.json();

  // ส่งข้อมูลไปยัง page ผ่าน props
  return { props: { data } };
}
