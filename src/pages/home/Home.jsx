    import React, { useState } from 'react'
    import Chart from "../../components/chart/Chart";
    import "./home.css"
    import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
    import WidgetSm from '../../components/WidgetSm/WidgetSm';
    import WidgetLg from '../../components/WidgetLg/WidgetLg';
    import { userData } from '../../dummyData';
    import {Redirect } from 'react-router-dom';
    import User from '../user/User';
    import Sidebar from '../../components/sidebar/Sidebar';
    const Home = () => {
        
        const [showHome, setShowHome] = useState(true);

        const handleUsersClick = () => {
            return Redirect("/users")
            //navigate("/users")
            setShowHome(false);
        };
        return (


            <div className="home">
                {showHome ? (
                    <>
                    
                        <FeaturedInfo />
                        <Chart data={userData} title="User Analytics" grid dataKey="Total Traveller" />
                        <div className="homeWidgets">
                            {/* <WidgetSm />
                            <WidgetLg /> */}
                        </div>
                    </>
                ):null}


                {/* <Sidebar handleUsersClick={handleUsersClick} /> */}
                {/* <User /> */}
            </div>
        );
    }
    export default Home;