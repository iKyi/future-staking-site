const dollarUSLocale = Intl.NumberFormat("en-US");

const parseWalletValue = (wallet: any, value: any) => {
  return !wallet
    ? "-"
    : process.env.NODE_ENV === "development"
    ? value
    : dollarUSLocale.format(value);
};

export default parseWalletValue;
