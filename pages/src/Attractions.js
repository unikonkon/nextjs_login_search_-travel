import React from 'react'
import Link from 'next/link'
export default function Attractions(props) {
    const attractions = props.attractions
   
  return (
    <div>       
       <ul>
            <li className="ml-10" key={attractions.id}>
            <Link href={"/"+attractions.id}>
                <a>{attractions.name}</a>
                </Link>
            </li>
          </ul>        
    </div>
  )
}
