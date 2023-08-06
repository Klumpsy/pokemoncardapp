export function filterCards(
  cards,
  rarity,
  type,
  holo,
  period,
  price,
  comparison,
  searchTerm,
  order
) {
  return cards
    .filter((card) => (rarity ? card.rarity.toLowerCase() === rarity : true))
    .filter((card) =>
      type
        ? card.types &&
          card.types.length > 0 &&
          card.types[0].toLowerCase() === type
        : true
    )
    .filter((card) =>
      holo
        ? holo === "holo"
          ? card.tcgplayer &&
            card.tcgplayer.prices &&
            card.tcgplayer.prices.holofoil
          : holo === "reverseholo"
          ? card.tcgplayer &&
            card.tcgplayer.prices &&
            card.tcgplayer.prices.reverseHolofoil
          : true
        : true
    )
    .filter((card) =>
      period && price
        ? period === "avg1"
          ? comparison === ">"
            ? card.cardmarket &&
              card.cardmarket.prices &&
              card.cardmarket.prices.avg1 > price
            : card.cardmarket &&
              card.cardmarket.prices &&
              card.cardmarket.prices.avg1 < price
          : period === "avg7"
          ? comparison === ">"
            ? card.cardmarket &&
              card.cardmarket.prices &&
              card.cardmarket.prices.avg7 > price
            : card.cardmarket &&
              card.cardmarket.prices &&
              card.cardmarket.prices.avg7 < price
          : period === "avg30"
          ? comparison === ">"
            ? card.cardmarket &&
              card.cardmarket.prices &&
              card.cardmarket.prices.avg30 > price
            : card.cardmarket &&
              card.cardmarket.prices &&
              card.cardmarket.prices.avg30 < price
          : true
        : true
    )
    .filter(
      (card) =>
        card.name.toLowerCase().includes(searchTerm) ||
        card.id.includes(searchTerm)
    )
    .sort((a, b) => {
      if (order === "asc") {
        return Number(a.number) - Number(b.number);
      } else if (order === "desc") {
        return Number(b.number) - Number(a.number);
      } else {
        return 0;
      }
    });
}
