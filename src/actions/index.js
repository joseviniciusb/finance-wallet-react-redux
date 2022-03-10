export const saveUserEmail = (userEmail) => ({
  type: 'SAVE_USER_EMAIL',
  payload: userEmail,
});

export const updateWallet = (wallet) => ({
  type: 'UPDATE_WALLET',
  payload: wallet,
});
