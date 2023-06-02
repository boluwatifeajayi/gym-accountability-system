import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalytics } from "../../features/goal/goalSlice";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const GetAnalytics = () => {
  const dispatch = useDispatch();
  const analyticsData = useSelector((state) => state.goal);

  useEffect(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 mt-4">Analytics Data</h2>
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-lg">
              <span className="font-semibold">Average Activity Participation:</span>{" "}
              {/* {analyticsData.averageFrequency} */} 12%
            </p>
            <p className="text-lg">
              <span className="font-semibold">Total Progress:</span>{" "}
              {/* {analyticsData.totalProgress} */} 25%
            </p>
            {/* Display other analytics data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAnalytics;
