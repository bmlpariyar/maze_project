import myLogo from "../assets/myLogo.png";
const Navbar = () => {
  return (
    <nav className="bg-black text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={myLogo} alt="Maze logo" className="w-14 h-14" />
          <span className="text-2xl font-bold">Maze Visulizer</span>
        </div>
        <div className="flex items-center space-x-6 mr-14 text-xl">
          <div className="flex items-center">
            <a href="#">About</a>
          </div>
          <div className="flex items-center">
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
