import "./user-profile-pic.scss";
import React from "react";


const UserProfilePic = ({
    src,
    fullName,
    designation="",
    imgSize=150
}) => {
    return (
        <div className="user-profile-pic">
            <img src={src} alt={fullName} style={{
                width: imgSize,
                height: imgSize,
                borderRadius: "50%"
            }}/>
            {fullName &&
                <div className="user-full-name">
                    {fullName}
                </div>
            }
            {designation &&
                <div className="designation">
                    {designation}
                </div>
            }
        </div>
    )
}

export default UserProfilePic;