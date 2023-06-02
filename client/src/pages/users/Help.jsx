import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Help = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 mt-4">Help</h2>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
            <ul className="list-disc pl-6">
              <li className="text-black">How do I create a new goal?</li>
              <li  className="text-black">How can I track my progress?</li>
              <li  className="text-black">How do I join a workout session?</li>
              {/* Add more FAQ items as needed */}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>If you have any further questions or need assistance, please contact our support team:</p>
            <p>Email: support@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
