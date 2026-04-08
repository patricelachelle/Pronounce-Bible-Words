const categories = ['All', 'People', 'Places', 'Books'];

function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`chip ${value === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
