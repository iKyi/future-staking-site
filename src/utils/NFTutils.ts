import { degenIdArray, nyxIdArray } from "constants/familyArrays";
import { ITokenCustomEntry } from "providers/Solana/services/FSLService";

export type NFTNameTypes = "Nyx" | "D3gen" | "Codex" | "";

const extractNftId = (title: string) => {
  return title
    ? Number(title.replace("Dark Terminal Hacker #", ""))
    : undefined;
};

const bindNftName = (nft: ITokenCustomEntry) => {
  const { typeId } = nft;
  if (!typeId) {
    return undefined;
  }
  switch (true) {
    case nyxIdArray.includes(typeId):
      return "Nyx";

    case degenIdArray.includes(typeId):
      return "D3gen";

    default:
      return "Codex";
  }
};

const bindNftClaimValue = (nft: ITokenCustomEntry) => {
  return 0;
  // const { name } = nft;
  // switch (true) {
  //   case name === "Nyx":
  //     return 0.962;
  //   case name === "D3gen":
  //     return 0.072;
  //   default:
  //     return 0.063;
  // }
};

const massExtractNftIds = (items: ITokenCustomEntry[]) => {
  return items.map((item) => {
    item.typeId = extractNftId(item.data.name);
    item.name = bindNftName(item) ?? item.data.name;
    item.solRedeemValue =
      item.solRedeemValue !== undefined
        ? item.solRedeemValue
        : bindNftClaimValue(item);
    item.dtacRedeemValue =
      item.dtacRedeemValue !== undefined ? item.dtacRedeemValue : 0;
    return item;
  });
};

const convertToFrontendObjectNftStyle = (stefanNft: any): ITokenCustomEntry => {
  stefanNft.solRedeemValue = stefanNft.claims.sol;
  stefanNft.dtacRedeemValue = stefanNft.claims.dtac;
  delete stefanNft.claim;
  return stefanNft;
};

export { massExtractNftIds, convertToFrontendObjectNftStyle };
