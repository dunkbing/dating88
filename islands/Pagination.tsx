import { useCallback, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { tw } from "twind";

interface ButtonProps {
  content: JSX.Element | number;
  href: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ content, href, onClick, active, disabled }: ButtonProps) {
  const btnStyle =
    tw`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg`;
  const activeStyle = active ? tw`bg-pink-600 text-white` : tw`text-pink-500`;
  const disabledStyle = disabled
    ? tw`text-red-300 bg-white cursor-not-allowed pointer-events-none`
    : tw`bg-white hover:bg-pink-600 hover:text-white`;

  return (
    <a
      className={`${btnStyle} ${activeStyle} ${disabledStyle}`}
      onClick={onClick}
      disabled={disabled}
      href={href}
    >
      {content}
    </a>
  );
}

interface Props {
  currentPage: number;
  pageCount: number;
}

export default function Pagination({ currentPage, pageCount }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(currentPage);

  const handleClick = useCallback((i: number) => {
    return () => setCurrentPageIndex(i);
  }, []);

  if (pageCount === 0) return null;

  const visiblePageButtonCount = 5;
  const numberOfButtons =
    (pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount) -
    1;
  const pageIndices = [currentPageIndex];
  for (let itemIndex = 0; itemIndex < numberOfButtons; itemIndex++) {
    const pageNumberBefore = pageIndices[0] - 1;
    const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
    if (
      pageNumberBefore >= 0 &&
      (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
    ) {
      pageIndices.unshift(pageNumberBefore);
    } else {
      pageIndices.push(pageNumberAfter);
    }
  }

  return (
    <ul className="flex gap-2">
      <li>
        <Button
          content={<div className="flex ml-1">&lt;&lt;</div>}
          disabled={!(currentPageIndex > 0)}
          href={`/`}
          onClick={() => setCurrentPageIndex(0)}
        />
      </li>
      {pageIndices.map((pageIndex) => (
        <li key={pageIndex}>
          <Button
            content={pageIndex + 1}
            active={currentPageIndex === pageIndex}
            disabled={currentPageIndex === pageIndex}
            href={`/?p=${pageIndex}`}
            onClick={handleClick(pageIndex)}
          />
        </li>
      ))}
      <li>
        <Button
          content={<div className="flex ml-1">&gt; &gt;</div>}
          href={`/`}
          disabled={!(currentPageIndex < pageCount - 1)}
          onClick={() => setCurrentPageIndex(pageCount - 1)}
        />
      </li>
    </ul>
  );
}
