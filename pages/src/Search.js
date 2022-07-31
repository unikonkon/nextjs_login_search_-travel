import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Search() {
  const [search, setSearch] = useState([]);
  useEffect(() => {
    axios
      .get("https://www.mecallapi.com/api/th/attractions")
      .then((response) => {
        setSearch(response.data);
      });
  }, []);
  const [items, setItems] = useState("");
  return (
    <div className="text-center">
      <br />
      <input
        type="text"
        placeholder="Search.."
        className="text-center text-slate-800 "
        onChange={(e) => setItems(e.target.value)}
      />
      {search
        .filter((user) => user.name.includes(items))
        .map((user) => {
          return (
            <div className="grid justify-items-center ">
              <br />
              <span className="">{user.name}</span>
              <img src={user.coverimage} />
            </div>
          );
        })}
    </div>
  );
}

 
// const App = () => {
//     const [travel, setTravel] = useState([])
//     const [searchQuery, setSearchQuery] = useState('')
//     const [url, setUrl] = useState("https://www.mecallapi.com/api/th/attractions")
//     const [loading, setLoading] = useState(false)

//     const fetchNews = () => {
//       setLoading(true)
//       fetch(url)
//         .then(result => result.json())
//         .then(data => (setTravel(data.hits), setLoading(false)))
//         .catch(error => console.log(error))
//     }

//     useEffect(() => {
//       fetchNews()
//     }, [url])

//     const handleChange = e => {
//       setSearchQuery(e.target.value)
//     }

//     const handleSubmit = e => {
//       e.preventDefault()
//       setUrl(`https://www.mecallapi.com/api/th/attractions=${searchQuery}`)
//     }

//     const searchForm = () => (
//       <form>
//         <input type="text" value={searchQuery} onChange={handleChange} />
//         <button onClick={handleSubmit}>Seach</button>
//       </form>
//     )

//     const showLoading = () => (
//       loading ? <h2>Loading...</h2> : ''
//     )

//     // const showData = () => (
//     //     travel.map((n, i) => (<p key={i}>{n.title}</p>))
//     //  )
//    console.log(setTravel)
//     return (
//       <div>
//         {showLoading()}
//         {searchForm()}
//         {/* {showData()} */}
//       </div >
//     )
//   }

//   export default App;

// export default function Search() {

//   const [country, setCountry] = useState([]);
//   const [ filters, setFilters ] = useState({ s: ''});

//   const search = (s) => {

//   }

//   useEffect(() => {
//     axios
//       .get("https://www.mecallapi.com/api/th/attractions")
//       .then((response) => {
//         setCountry(response.data);
//       });
//   }, [filters]);

// //   console.log(country);
//   return (
//     <div>
//         <from>
//       <input
//     //   value={country}
//         type="text"
//         placeholder="Search.."
//         onChange={(e) => setCountry(e.target.value)}
//         // onKeyUp={(e) => setCountry(e.target.value)}
//       />
//       </from>
//       <div className="">

//       </div>
//     </div>
//   );
// }

// function Page({ data }) {
//     // console.log(data)
//     // Render data...
//   }

//   // This gets called on every request
//   export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch("https://www.mecallapi.com/api/th/attractions")
//     const data = await res.json()

//     // Pass data to the page via props
//     return { props: { data } }
//   }

// // //function นี้ถูกเรียกก็ต่อเมื่อตอน build ทำให้ไปดึง API มาใช้ได้
// // export async function getServerSideProps() {
// //     // ดึงข้อมูลจาก API  ภายนอก
// //     const res = await fetch("https://www.mecallapi.com/api/th/attractions");
// //     const data = await res.json();

// //     // ส่งข้อมูลไปยัง page ผ่าน props
// //     return { props: { data } };}
