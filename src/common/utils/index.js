const emoji = {
  salad: '🥗',
  bacon: '🥓',
  cheese: '🧀',
  meat: '🍖',
  burger: '🍔',
};

export const addEmoji = (label) => {
  return emoji[label] + ' ' + label;
};

/**
 * @param {Object} ingredients burger ingredients
 * @param {number} containerHeight container height in pixel
 * @return {number} height of the burger in pixel
 */
export const getBurgerHeight = (ingredients, containerHeight) => {
  // % of the container height
  const heights = {
    breadTop: 20,
    breadBottom: 13,
    salad: 7,
    bacon: 3,
    cheese: 5,
    meat: 8,
    margin: 1,
  };

  const ingredientsHeight = Object.entries(ingredients).reduce(
    (sum, [ing, qty]) => {
      return sum + (heights[ing] + heights.margin) * qty;
    },
    0
  );

  const totalHeight =
    ingredientsHeight + heights.breadTop + heights.breadBottom;

  return Math.floor((containerHeight * totalHeight) / 100);
};
