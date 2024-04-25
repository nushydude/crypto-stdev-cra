type Props = {
  rows?: number;
  showChartSection?: boolean;
};

export const Skeleton = ({ rows = 5, showChartSection = true }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {new Array(rows).fill(0).map((_, index) => (
        <div
          key={index}
          className="rounded-lg mb-2.5 p-2.5 border bg-gray-100 border-gray-200"
        >
          <div className="h-8 mb-2 animate-pulse bg-gray-300" />
          <div className="flex flex-col">
            <div className="w-full">
              <div className="h-4 mb-3 animate-pulse w-2/4 bg-gray-300" />
              <div className="h-4 mb-3 animate-pulse w-2/4 bg-gray-300" />
              <div className="h-4 mb-3 animate-pulse w-2/4 bg-gray-300" />
              <div className="h-4 mb-3 animate-pulse w-2/4 bg-gray-300" />
            </div>
            {showChartSection && (
              <div className="w-full">
                <div className="h-36 w-full animate-pulse bg-gray-300" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
