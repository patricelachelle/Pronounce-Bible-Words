function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      className={`favorite-btn ${isFavorite ? 'active' : ''}`}
      onClick={onToggle}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
}

export default FavoriteButton;
