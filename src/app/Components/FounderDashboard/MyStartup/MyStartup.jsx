import React from "react";
import RegisterNewStartup from "../RegisterNewStartup/RegisterNewStartup";

const MyStartup = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Startup</h1>
        <p className="text-muted-foreground">
          Manage your ventures core information and funding status.
        </p>
      </div>

      {/* Main Container */}
      <RegisterNewStartup></RegisterNewStartup>
    </div>
  );
};

export default MyStartup;
