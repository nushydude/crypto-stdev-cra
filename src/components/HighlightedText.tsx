type Props = {
  text: string;
  highlight: string;
};

const HighlightedText = ({ text, highlight }: Props) => {
  if (!highlight) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, index) => (
        <span
          key={index}
          className={
            part.toLowerCase() === highlight.toLowerCase() ? 'font-bold' : ''
          }
        >
          {part}
        </span>
      ))}
    </>
  );
};

export default HighlightedText;
