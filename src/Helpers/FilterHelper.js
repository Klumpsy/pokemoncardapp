export function filterCards(cards, type, searchTerm) {
  return cards.filter(
    (card) =>
      (!type ||
        (card.types &&
          card.types[0] &&
          card.types[0].toLowerCase() === type)) &&
      (card.name.toLowerCase().includes(searchTerm) ||
        card.id.includes(searchTerm))
  );
}
