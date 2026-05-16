const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Total Tasks</h2>

        <p className="text-3xl font-bold mt-4">0</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Completed Tasks</h2>

        <p className="text-3xl font-bold mt-4">0</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Pending Tasks</h2>

        <p className="text-3xl font-bold mt-4">0</p>
      </div>
    </div>
  );
};

export default Dashboard;
