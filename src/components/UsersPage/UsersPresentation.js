import React from "react";

import profile_photo from "./../../assets/profile_logo.png"
import { Pagination } from "react-custom-pagination";
import { NavLink } from "react-router-dom";

import axios from "axios"

let Users = props =>  {
    return (
      <div className="py-10 h-screen w-full bg-gray-300 px-2">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-full">
          <div className="holder ml-3 mr-3">
            {props.users ? props.users.map( (user, i) => <UsersCard key={i} follow={props.follow} unfollow={props.unfollow} data={user} /> ) : <div>Нет пользователей</div>}
          </div>
        </div>
        <div className="py-2">
          <nav className="block">
            <Pagination
              totalPosts={props.totalCount}
              postsPerPage={props.pageSize}
              paginate={props.onPageChanged}
              view={15}
            />
          </nav>
        </div>
      </div>
    ) 
  }

let UsersCard = props => {
  
  let follow = () => {
    console.log("props.data.id: ", props.data.id)
    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${props.data.id}`, {}, 
      { withCredentials: true, headers: { "API-KEY": "b1c701e7-7116-4229-b7f1-1eaca5f1b1fe"} })
      .then(response => {
        if (response.data.resultCode === 0) {
          props.follow(props.data.id)
        }
        else console.log("FOLLOW ERROR: ", response)
      })
  }

  let unfollow = () => {
    console.log("props.data.id: ", props.data.id)
    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.data.id}`, { withCredentials: true, headers: { "API-KEY": "b1c701e7-7116-4229-b7f1-1eaca5f1b1fe"} })
      .then(response => {
        console.log(response)
        if (response.data.resultCode === 0) {
          props.unfollow(props.data.id)
        }
        else console.log("UNFOLLOW ERROR: ", response)

    })
  }

  return (
    <div className="card border-4 w-full hover:shadow-2xl m-5 relative flex flex-col mx-auto">
      <NavLink to={"/users/profile/" + props.data.id}>
        <div className="profile w-full flex m-3 ml-4 text-white">
          <img className="w-28 h-28 p-1 bg-white rounded-full" src={props.data.photos.large ? props.data.photos.large : profile_photo} alt="avatar" />
          <div className="title mt-11 ml-3 font-bold flex flex-col">
            <div className="name break-words text-gray-600">{props.data.name}</div>
            <div className="add font-semibold text-sm italic text-gray-600">{props.data.status}</div>
          </div>
        </div>
      </NavLink>
      <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
        <div onClick={props.data.followed ? unfollow : follow} className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">{props.data.followed ? "Unfollow" : "Follow"}</div>
        <div className="add border rounded-r-2xl rounded-l-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">View</div>
      </div>
    </div>
  )

}

export default Users