import { ButtedLooseLeafForm } from "./butted-loose-leaf-form-descriptor";

export const ButtedLooseLeafTestProps = ['freeLamina', 'scrap', 'looseButts', 'unbuttedEnds', 'nakedStems'] as const;
export type ButtedLooseLeafPercentageResult =
  Pick<ButtedLooseLeafForm, typeof ButtedLooseLeafTestProps[number]> &
  {
    buttedLeaf: number,
    buttLengthLeft: number,
    buttLengthRight: number
  };
