interface IconProps {
  width?: string;
  height?: string;
  color?: string;
}

export const DropdownIcon = ({ color = 'gray' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ml-auto h-4 w-4 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export const SearchIcon = ({ color = 'gray', width = '32px', height = '32px' }: IconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export const CloseIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.39705 4.55379L4.46967 4.46967C4.73594 4.2034 5.1526 4.1792 5.44621 4.39705L5.53033 4.46967L12 10.939L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.061 12L19.5303 18.4697C19.7966 18.7359 19.8208 19.1526 19.6029 19.4462L19.5303 19.5303C19.2641 19.7966 18.8474 19.8208 18.5538 19.6029L18.4697 19.5303L12 13.061L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.939 12L4.46967 5.53033C4.2034 5.26406 4.1792 4.8474 4.39705 4.55379Z"
        fill="#FF090D"
      />
    </svg>
  );
};

export const HomeIcon = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.1671 10.1617L15.9453 5.32239C15.3993 4.89762 14.7273 4.66699 14.0355 4.66699C13.3437 4.66699 12.6717 4.89762 12.1256 5.32239L5.90265 10.1617C5.52867 10.4526 5.22609 10.825 5.01803 11.2506C4.80997 11.6763 4.70193 12.1438 4.70215 12.6176V21.0176C4.70215 21.6364 4.94798 22.2299 5.38557 22.6675C5.82315 23.1051 6.41664 23.3509 7.03548 23.3509H21.0355C21.6543 23.3509 22.2478 23.1051 22.6854 22.6675C23.123 22.2299 23.3688 21.6364 23.3688 21.0176V12.6176C23.3688 11.6574 22.9255 10.7509 22.1671 10.1617Z"
        fill="black"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.6663 17.4998C16.088 19.0549 11.909 19.0549 9.33301 17.4998"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
