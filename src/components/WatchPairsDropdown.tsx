import { useEffect, useRef, useState } from 'react';
import {
  MdChevronLeft as ChevronIcon,
  MdClose as CloseIcon,
} from 'react-icons/md';
import { useClickAway } from 'react-use';
import HighlightedText from './HighlightedText';

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
  useClickAway(ref, () => setIsOpen(false));

  useEffect(() => {
    const timerID = setTimeout(() => {
      const lowerCaseSearch = search.toLowerCase();
      const sortedFilteredItems = items
        .filter((item) => item.toLowerCase().includes(lowerCaseSearch))
        .sort((a, b) => a.localeCompare(b));
      setFilteredItems(sortedFilteredItems);
    }, 250);

    return () => clearTimeout(timerID);
  }, [search, items]);

  const iconClass = isOpen ? 'rotate-90' : '-rotate-90';

  return (
    <div className="relative w-full sm:w-80 mx-auto z-30" ref={ref}>
      <div
        className="flex flex-row justify-between items-center px-4 py-2 cursor-pointer border border-gray-300 bg-gray-100 select-none"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="text-black inline-block">Watch Pairs</span>
        <ChevronIcon className={`${iconClass} ml-4`} />
      </div>
      {isOpen && (
        <div className="absolute w-full bg-white no-scrollbar shadow-slate-300 shadow">
          <div className="p-2 relative border-b border-gray-300 bg-white shadow-lg select-none">
            <input
              type="text"
              value={search}
              placeholder="Filter"
              className="w-full p-2 pr-8 border border-gray-300 rounded-md"
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <CloseIcon
              className="absolute right-4 top-5 cursor-pointer"
              onClick={() => setSearch('')}
            />
          </div>
          <div className="max-h-96 overflow-auto">
            {filteredItems.map((item) => (
              <div
                key={item}
                className="flex flex-row justify-between items-center px-4 py-2 mx-auto border-b border-gray-300 :last:border-b-0 select-none"
              >
                <span className="text-black inline-block">
                  <HighlightedText text={item} highlight={search} />
                </span>
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
              <span className="p-2 inline-block text-orange-500 select-none">
                No trading pairs found
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPairsDropdown;
