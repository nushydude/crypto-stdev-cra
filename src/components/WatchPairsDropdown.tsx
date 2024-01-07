import { useEffect, useRef, useState } from 'react';
import { MdChevronLeft, MdClose } from 'react-icons/md';
import { useClickAway } from 'react-use';

type Props = {
  items: string[];
  selectedItems: string[];
  onItemCheckChanged: (item: string, isChecked: boolean) => void;
};

const WatchPairsDropdown = ({
  items,
  selectedItems,
  onItemCheckChanged,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    let timerID: NodeJS.Timeout;

    timerID = setTimeout(() => {
      if (search) {
        setFilteredItems(
          items.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase()),
          ),
        );
      } else {
        setFilteredItems(items);
      }
    }, 250);

    return () => clearTimeout(timerID);
  }, [search, items]);

  return (
    <div className="relative w-full sm:w-80 mx-auto z-30" ref={ref}>
      <div
        className="flex flex-row justify-between items-center px-4 py-2 cursor-pointer border border-gray-300 bg-gray-100"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="text-black inline-block">Watch Pairs</span>

        {/* TODO: investigate why styling doesn't work when done in oneline */}
        {isOpen ? (
          <MdChevronLeft className="rotate-90 ml-4" />
        ) : (
          <MdChevronLeft className="-rotate-90 ml-4" />
        )}
      </div>
      {isOpen && (
        <div className="absolute w-full max-h-96 overflow-auto bg-white no-scrollbar shadow-slate-300 shadow">
          <div className="p-2 relative">
            <input
              type="text"
              value={search}
              placeholder="Filter"
              className="w-full p-2 pr-8 border border-gray-300 rounded-md"
              onChange={(e) => setSearch(e.target.value)}
            />
            <MdClose
              className="absolute right-4 top-5 cursor-pointer"
              onClick={() => setSearch('')}
            />
          </div>
          {filteredItems.map((item) => (
            <div
              key={item}
              className="flex flex-row justify-between items-center  px-4 py-2 mx-auto border-b border-gray-300 :last:border-b-0"
            >
              <span className="text-black inline-block">{item}</span>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={(e) => {
                  e.stopPropagation();
                  onItemCheckChanged(item, e.target.checked);
                }}
              />
            </div>
          ))}
          {filteredItems.length === 0 && (
            <span className="p-2 inline-block text-orange-500">
              No trading pairs found
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchPairsDropdown;
