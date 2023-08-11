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
    .filter(
      (card) =>
        (!rarity || (card.rarity && card.rarity.toLowerCase() === rarity)) &&
        (!type ||
          (card.types &&
            card.types[0] &&
            card.types[0].toLowerCase() === type)) &&
        (!holo ||
          (holo === "holo" &&
            card.tcgplayer &&
            card.tcgplayer.prices &&
            card.tcgplayer.prices.holofoil) ||
          (holo === "reverseholo" &&
            card.tcgplayer &&
            card.tcgplayer.prices &&
            card.tcgplayer.prices.reverseHolofoil)) &&
        (!period ||
          !price ||
          (card.cardmarket &&
            card.cardmarket.prices &&
            ((period === "avg1" &&
              ((comparison === ">" && card.cardmarket.prices.avg1 > price) ||
                (comparison !== ">" && card.cardmarket.prices.avg1 < price))) ||
              (period === "avg7" &&
                ((comparison === ">" && card.cardmarket.prices.avg7 > price) ||
                  (comparison !== ">" &&
                    card.cardmarket.prices.avg7 < price))) ||
              (period === "avg30" &&
                ((comparison === ">" && card.cardmarket.prices.avg30 > price) ||
                  (comparison !== ">" &&
                    card.cardmarket.prices.avg30 < price)))))) &&
        (card.name.toLowerCase().includes(searchTerm) ||
          card.id.includes(searchTerm))
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
