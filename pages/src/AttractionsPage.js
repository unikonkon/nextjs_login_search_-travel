import React from "react";
import Link from 'next/link'

export default function AttractionsPage(props) {
  const attraction = props.attraction;
  return (
    <div>
      <img src={attraction.coverimage} />
      <div className=""> {attraction.name}</div>
      <div className=""> {attraction.detail}</div>
      <div className="text-right">
      <Link href="/">
      <button className="bg-stone-800 rounded-xl text-white w-20 ">Back</button>
      </Link>
      </div>
    </div>
  );
}
