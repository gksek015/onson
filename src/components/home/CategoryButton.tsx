import { FilterIcon } from '../icons/Icons';

const CategoryButton = () => {
  return (
    <div>
      <button type="button" className="rounded-full border border-red-400 p-2.5">
        <FilterIcon />
      </button>
    </div>
  );
};

export default CategoryButton;
