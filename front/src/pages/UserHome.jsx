import React from "react";
import Sidebar from "../components/Sidebar";

const UserHome = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: "flex" ,minHeight: "84vh",paddingLeft:"200px" }}>
      {/* Sidebar only once */}
      <div style={{ width: isOpen ? "15%" : "0", transition: "width 0.3s" }}>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content */}
      <div style={{ width : isOpen ? "100%" : "85%", flex: 1, padding: "20px" }}>
        <h1>Welcome to User Home</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};


export default UserHome;
