const emoji = {
  salad: '🥗',
  bacon: '🥓',
  cheese: '🧀',
  meat: '🍖',
  burger: '🍔',
};

export const addEmoji = (label) => {
  return emoji[label] + label;
};
