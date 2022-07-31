import React from "react";
import AttractionsPage from "./src/AttractionsPage";

export default function Attraction({ post }) {
  return (
    <div>
      {" "}
      <AttractionsPage attraction={post.attraction} />
    </div>
  );
}

// ฟังก์ชันนี้ถูกเรียกเมื่อถึงเวลาสร้าง
// หน้า data ที่มีอยู่มีข้อมูลอะไรอยู๋บ้าง
export async function getStaticPaths() {
  // เรียกปลายทาง API ภายนอกเพื่อรับโพสต์
  const res = await fetch("https://www.mecallapi.com/api/th/attractions");
  const posts = await res.json();

  // รับเส้นทางหน้าที่ต้องการ แล้วแสดงผลหน้าตาม ID
  const paths = posts.map((post) => ({
    params: { id: String(post.id) },
  }));

  // หากผิดขึ้นหน้า 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://www.mecallapi.com/api/th/attractions/${params.id}`
  );
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}
