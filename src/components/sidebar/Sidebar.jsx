import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  MailOutline,
  ExpandLess,
  ExpandMore,

} from "@material-ui/icons";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
// import User from "../../pages/user/User";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom";
import User from "../../pages/user/User";
import { useState } from "react";
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NewUser from "../../pages/newUser/NewUser";
import NewProduct from "../../pages/newProduct/NewProduct";
import axios from 'axios';

const Sidebar = () => {

  const [buses, setBuses] = useState([]);

  const history = useHistory();

  const handleUsersClick = async () => {
    try {
      const response = await axios.get('your-api-endpoint'); // Replace 'your-api-endpoint' with the actual API endpoint
      console.log(response.data); // Log the data received from the API


      setOpenSubMenu(!openSubMenu);
    } catch (error) {


    }
    history.push('/users');
    setOpenSubMenu(!openSubMenu);
  };

  const handleDriverClick = async () => {
    try {
      const response = await axios.get('http://localhost:4500/getalldrivers');
      console.log(response.data); // Handle the data as needed
      setBuses(response.data);
      // Update state or perform other actions with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // history.push('/newproduct');
    setOpenSubMenuDriver(!openSubMenuDriver);
  };
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [openSubMenuDriver, setOpenSubMenuDriver] = useState(false);

  const handleSubMenuClick = () => {
    setOpenSubMenu(!openSubMenu);
  };
  const [isNewUserOpen, setNewUserOpen] = useState(false);
  const [isNewDriverOpen, setNewDriverOpen] = useState(false);
  const [isNewBusUpateOpen, setNewBusUpateOpen] = useState(false);
  const [isDiscountOpen, setDiscountOpen] = useState(false);


  const handleNewUserClick = () => {
    setNewUserOpen(!isNewUserOpen);
    history.push('/newUser');
  };
  const handleUpdateUserClick = () => {
    setNewUserOpen(!isNewUserOpen);
    history.push('/user/:userId');
  };
  const handleUpdateBusClick = () => {
    setNewUserOpen(!isNewUserOpen);
    history.push('/newUser');
  };


  const handleNewDriverClick = (e) => {
    e.preventDefault();
    setNewDriverOpen(!isNewDriverOpen);
    history.push('/newproduct');
    console.log(isNewDriverOpen);

  };
  const handleBusUpdateClick = (e) => {
    e.preventDefault();
    setNewBusUpateOpen(!isNewBusUpateOpen);
    history.push('/productupdate');
    console.log(isNewBusUpateOpen);

  };
  const handleDiscountsClick = async () => {
    try {
      const response = await axios.get('http://localhost:4500/getdiscounts');
      console.log(response.data); // Handle the data as needed
      // You can update state or perform other actions with the fetched data
    } catch (error) {
      console.error('Error fetching discounts:', error);
      // Handle errors or show an alert
    }
    history.push('/discounts');
  };
  const handleLogout = () => {
    // Clear username and set isLoggedIn to false in sessionStorage
    sessionStorage.removeItem('username');
    sessionStorage.setItem('isLoggedIn', false);

    setTimeout(() => {
      return Redirect('/');
  }, 2000); 
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem" onClick={handleUsersClick}>
              <PermIdentity className="sidebarIcon" />
              Drivers
              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
            </li>
            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={handleNewUserClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Driver" />
                </ListItem>
                {/* {isNewUserOpen && <NewUser />} */}
                <ListItem button onClick={handleUpdateUserClick}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update Driver" />
                </ListItem>

              </List>
            </Collapse>
            <Link to="/products" className="link">
              <li className="sidebarListItem" onClick={handleDriverClick}>
                <Storefront className="sidebarIcon" />
                Buses
                {openSubMenuDriver ? <ExpandLess /> : <ExpandMore />}
              </li>
              <Collapse in={openSubMenuDriver} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                  {/* {isNewDriverOpen && <NewProduct />} */}
                  <ListItem button onClick={handleNewDriverClick}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Bus" />
                  </ListItem>
                  <ListItem button onClick={handleBusUpdateClick}>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Update Bus  " />
                  </ListItem>
                </List>
              </Collapse>
            </Link>
            <li className="sidebarListItem" onClick={handleDiscountsClick}>
              <MailOutline className="sidebarIcon" />
              Discounts
            </li>

            <li className="sidebarListItem" onClick={handleLogout}>
              <LogoutIcon className="sidebarIcon" />
              Logout
            </li>

          </ul>
        </div>

      </div>
    </div>
  );
}
export default Sidebar;