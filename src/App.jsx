import Travel_InfoList from "./components/Travel_InfoList";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          BlueTravel
        </h1>
        <p className="text-slate-300">Explore the Future of Travel</p>
      </header>
      <Travel_InfoList />
    </div>
  );
};

export default App;
