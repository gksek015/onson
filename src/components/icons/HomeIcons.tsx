interface IconProps {
  width?: string;
  height?: string;
  color?: string;
}

export const DropdownIcon = ({ color = 'gray' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-500 ml-auto"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export const SearchIcon = ({ color = 'gray' }: IconProps) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_15_959)">
        <path
          d="M14.2496 6.75C15.6476 6.74994 17.0178 7.14061 18.2055 7.87792C19.3932 8.61523 20.3512 9.66983 20.9714 10.9227C21.5916 12.1756 21.8493 13.5769 21.7154 14.9684C21.5815 16.36 21.0613 17.6864 20.2136 18.798L24.9566 23.543C25.136 23.723 25.2401 23.9644 25.2478 24.2184C25.2556 24.4723 25.1664 24.7197 24.9984 24.9103C24.8303 25.1008 24.5961 25.2203 24.3431 25.2444C24.0902 25.2685 23.8376 25.1954 23.6366 25.04L23.5426 24.957L18.7976 20.214C17.8506 20.9361 16.7453 21.4223 15.573 21.6324C14.4008 21.8425 13.1954 21.7704 12.0566 21.4221C10.9178 21.0738 9.87826 20.4594 9.02406 19.6295C8.16986 18.7997 7.52555 17.7785 7.14443 16.6502C6.76332 15.5219 6.65636 14.3191 6.8324 13.1413C7.00844 11.9635 7.46243 10.8445 8.1568 9.87703C8.85117 8.90951 9.76595 8.12126 10.8254 7.57749C11.8849 7.03372 13.0587 6.75006 14.2496 6.75ZM14.2496 8.75C12.7909 8.75 11.392 9.32946 10.3605 10.3609C9.32907 11.3924 8.74961 12.7913 8.74961 14.25C8.74961 15.7087 9.32907 17.1076 10.3605 18.1391C11.392 19.1705 12.7909 19.75 14.2496 19.75C15.7083 19.75 17.1072 19.1705 18.1387 18.1391C19.1701 17.1076 19.7496 15.7087 19.7496 14.25C19.7496 12.7913 19.1701 11.3924 18.1387 10.3609C17.1072 9.32946 15.7083 8.75 14.2496 8.75Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_15_959">
          <rect width="24" height="24" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-down-up"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3l0 18" />
      <path d="M10 18l-3 3l-3 -3" />
      <path d="M7 21l0 -18" />
      <path d="M20 6l-3 -3l-3 3" />
    </svg>
  );
};
