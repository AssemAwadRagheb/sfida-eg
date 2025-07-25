const MainLoader = ({
  bgWidth = "w-full", // Default width of the background
  bgHeight = "h-screen", // Default height of the background
  loaderWidth = "w-16", // Default width of the loader
  loaderHeight = "h-16", // Default height of the loader
}) => {
  return (
    <div
      className={`flex items-center justify-center ${bgWidth} ${bgHeight} bg-white`}
    >
      <div
        className={`animate-spin rounded-full ${loaderWidth} ${loaderHeight} border-t-4 border-[#2E7CF6] border-opacity-50`}
      ></div>
    </div>
  );
};

export default MainLoader;
