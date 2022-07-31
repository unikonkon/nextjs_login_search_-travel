import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function User({ data }) {
  const { data: session } = useSession();
  return (
    <div>
      <div className="">
        <span className="pl-5"> Welcome to page</span>
        <span className="absolute top-0 right-0 pr-5">
          {session.user.email} <br />
          <button
            onClick={() => signOut()}
            className="bg-red-400 rounded-xl text-white w-20 mt-3 ml-36"
          >
            Sign out
          </button>
        </span>
      </div>
      <div className="justify-center flex pt-10">
        <img src={session.user.avatar} className="w-16 " />
      </div>
      <div className="justify-center flex pt-6">
        First Name : {session.user.fname}{" "}
      </div>
      <div className="justify-center flex pb-8">
        Last Name : {session.user.lname}{" "}
      </div>
      <div className="justify-center flex ">สถานที่ท่องท่องต่างๆ</div>
    </div>
  );
}
