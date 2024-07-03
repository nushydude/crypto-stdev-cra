import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  MdChevronLeft as ChevronIcon,
  MdClose as CloseIcon,
} from 'react-icons/md';
import { useClickAway } from 'react-use';
import { FixedSizeList as List } from 'react-window';
import HighlightedText from './HighlightedText';

type Props = {
  values: Array<string>;
  selectedValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  noResultsFoundText: string;
};

const SearchableDropdown: React.FC<Props> = ({
  values,
  selectedValue,
  onChange,
  noResultsFoundText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(values);
  const ref = useRef(null);
  useClickAway(ref, () => setIsOpen(false));

  useEffect(() => {
    const timerID = setTimeout(() => {
      const lowerCaseSearch = search.toLowerCase();
      const sortedFilteredItems = values.filter((item) =>
        item.toLowerCase().includes(lowerCaseSearch),
      );
      setFilteredItems(sortedFilteredItems);
    }, 250);

    return () => clearTimeout(timerID);
  }, [search, values]);

  const handleItemSelect = (item: string) => {
    const event = {
      target: { value: item },
    } as ChangeEvent<HTMLInputElement>;
    onChange(event);
    setIsOpen(false);
  };

  const iconClass = isOpen ? 'rotate-90' : '-rotate-90';

  const renderItem = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div
      key={filteredItems[index]}
      style={style}
      className={`flex flex-row justify-between items-center px-4 py-2 mx-auto border-b border-gray-300 select-none ${
        selectedValue === filteredItems[index] ? 'bg-blue-100' : ''
      }`}
      onClick={() => handleItemSelect(filteredItems[index])}
    >
      <span className="text-black inline-block">
        <HighlightedText text={filteredItems[index]} highlight={search} />
      </span>
    </div>
  );

  console.log('rendering');

  return (
    <div className="relative w-full z-30" ref={ref}>
      <div
        className="flex flex-row justify-between items-center px-4 py-2 cursor-pointer border border-gray-300 bg-gray-100 select-none"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="text-black inline-block">
          {selectedValue || 'Select Symbol'}
        </span>
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
            {filteredItems.length > 0 ? (
              <List
                height={400}
                itemCount={filteredItems.length}
                itemSize={35}
                width="100%"
              >
                {renderItem}
              </List>
            ) : (
              <span className="p-2 inline-block text-orange-500 select-none">
                {noResultsFoundText}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchableDropdown);
