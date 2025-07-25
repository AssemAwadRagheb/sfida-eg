const SmallBasicLoader = ({ bgWidth = "16rem", bgHeight = "16rem" }) => {
  return (
    <div
      className={`flex items-center justify-center ${bgWidth} ${bgHeight} bg-white`}
    >
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SmallBasicLoader;
