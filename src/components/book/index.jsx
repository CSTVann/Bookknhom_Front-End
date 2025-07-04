import React from "react";
import "../../assets/style/book.css";
import Link from "next/link";

const Box = () => {
  return (
    <div className="box">
      <div className="card-book">
        <div className="overlap">
          <svg className="heart" xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">

          </svg>
          <div className="Name">
            <div className="text-wrapper">Book Name</div>
            <div className="text-wrapper">Author Name</div>
          </div>
        </div>
        <div className="profile">
          <svg></svg>
          <div className="group">
            <div className="text-wrapper2">Ms. Lika</div>
            <div className="group-2">
              <svg></svg>
              <div className="text-wrapper3">12k points</div>
            </div>
          </div>
        </div>
      </div>
      <div className="like-and-cmd">
        <div className="overlap-wrapper">
          <div className="overlap-group">
            <div className="rectagle"/>
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <svg></svg>
                <svg></svg>
                <div className="text-wrapper-5">15k</div>
              </div>
            </div>
          </div>
          <div className="text-wrapper-7">
            <Link href="#">View Detail</Link>
          </div>
        </div>
      </div>

    </div>
 
    
    
  );
};
export default Box;