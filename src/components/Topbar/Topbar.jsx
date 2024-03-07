import React from 'react'
import "./topbar.css"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
export default function Topbar() {
    return (
        <div className='Topbar'>
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">TripIt</span>
                    {/* <img src="/logo.png" alt='' style={{height:'100px'}}/> */}
                </div>
                <div className="topRight">
                    {/* <div className="topbarIconContainer">
                        <NotificationsNoneIcon />
                        <span className="topIconBag">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <LanguageIcon />
                        <span className="topIconBag">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <SettingsIcon />
                        <span className="topIconBag">2</span>
                    </div> */}
                    <img src="/user.png" alt="userlogo" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
