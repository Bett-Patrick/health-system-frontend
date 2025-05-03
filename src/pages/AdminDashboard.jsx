const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h2>
        <p>Your role: {user?.role}</p>
        {/* Add links to create program, view clients, etc */}
      </div>
    );
  };
  
  export default AdminDashboard;
  