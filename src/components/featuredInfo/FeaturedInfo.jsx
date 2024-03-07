import React, { useEffect, useState } from 'react'
import "./featuredInfo.css"
import { ArrowDownward, ArrowUpward } from "@material-ui/icons"
import axios from 'axios';
export default function FeaturedInfo() {

  const [activeBuses, setActiveBuses] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState(0);

  useEffect(() => {
    const fetchActiveBuses = async () => {
      try {
        const response = await axios.get('http://localhost:4500/getallbus'); // Replace with your API endpoint
        const numberOfActiveBuses = response.data.data.length; // Assuming your API returns an array of buses
        setActiveBuses(numberOfActiveBuses);

      } catch (error) {
        console.error('Error fetching active buses:', error);
      }
    };
    const fetchTotalDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:4500/getalldrivers');
        // Assuming your API response contains the total number of drivers
        const totalDriversCount = response.data.data.length;
        setTotalDrivers(totalDriversCount);
      } catch (error) {
        console.error('Error fetching total drivers:', error);
      }
    };

    fetchTotalDrivers();
    fetchActiveBuses();
  }, []);

  // The empty dependency array ensures that this effect runs only once on component mount
  console.log(activeBuses)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Active Buses</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{activeBuses}</span>
          {/* <span className="featuredMoneyRate">
              -11.4 <ArrowDownward  className="featuredIcon negative"/>
            </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Drivers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalDrivers}</span>
          {/* <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon"/>
            </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
