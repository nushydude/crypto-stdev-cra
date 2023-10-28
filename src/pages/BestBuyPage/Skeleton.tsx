type Props = {
  rows?: number;
};

export const Skeleton = ({ rows = 5 }: Props) => {
  return (
    <div>
      {new Array(rows).fill(0).map((dataItem, index) => (
        <div
          key={index}
          className="rounded-lg mb-2.5 p-2.5 border bg-gray-100 border-gray-200"
        >
          <div className="h-8 mb-2 animate-pulse bg-gray-300" />
          <div className="flex justify-between flex-col sm:flex-row">
            <div className="w-100 sm:w-2/4">
              <div className="h-4 mb-3 animate-pulse w-2/4 bg-gray-300" />
              <div className="h-4 mb-3 animate-pulse w-2/4 bg-gray-300" />
              <div className="h-4 mb-3 animate-pulse w-2/4 bg-gray-300" />
              <div className="h-4 mb-3 animate-pulse w-2/4 bg-gray-300" />
            </div>
            <div className="w-100 sm:w-2/4">
              <div className="h-36 w-full animate-pulse bg-gray-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
