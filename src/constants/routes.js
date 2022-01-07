export const ALL_BANKS = '/all-banks';
export const BANK_DETAILS = '/bank-details/:ifsc';
export const FAVORITES = '/favorites';

export const getLeftPanelKey = (currentPath) => {
  switch (currentPath) {
    case ALL_BANKS:
      return '0';
    case FAVORITES:
      return '1';
    default:
      return '0';
  }
};
