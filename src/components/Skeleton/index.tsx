function Skeleton() {
  return (
    <div role="status" className="animate-pulse flex flex-col p-8 mb-4 rounded-2xl bg-white">
      <div className="pb-6 border-b-2 border-solid border-slate-200">
        <div className="mb-2 w-full h-7 rounded-md bg-slate-100 dark:bg-slate-300" />
        <p className="w-full h-5 rounded-md bg-slate-100 dark:bg-slate-300"></p>
      </div>
      <div className="mt-4 w-full h-7 pt-3 rounded-md bg-slate-100 dark:bg-slate-300" />
    </div>
  );
}

export default Skeleton;
