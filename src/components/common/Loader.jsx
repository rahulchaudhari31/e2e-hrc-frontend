const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative mx-auto h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Loading content...
        </p>
      </div>
    </div>
  );
};

export default Loader;