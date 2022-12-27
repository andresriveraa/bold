import type { NextApiRequest, NextApiResponse } from "next";

type totalSales = {
  total_sales: number;
};

interface amount {
  value: number;
  deduction?: number;
}

interface salesItem {
  transaction: string;
  date : string;
  payment_method: string;
  transction_id: string;
  amount: amount;
}

interface salesResponse { allSales: salesItem[]}

const sales = [
  {
    transaction: 'Cobro exitoso',
    date : '04/06/2020 17:14:24',
    payment_method: '**** **** **** 7711',
    transction_id: 'GZEN23784UBV2',
    amount: {
      value: 25000000,
      deduction: 1500000
    },
  },
  {
    transaction: 'Cobro no realizado',
    date : '04/06/2020 17:14:24',
    payment_method: '**** **** **** 7711',
    transction_id: 'GZEN23784UBV2',
    amount: {
      value: 25000,
      deduction: 1500
    },
  },
  {
    transaction: 'Cobro exitoso',
    date : '04/06/2020 17:14:24',
    payment_method: '**** **** **** 7711',
    transction_id: 'GZEN23784UBV2',
    amount: {
      value: 25000,
      deduction: 1500
    },
  }
]


const getAllTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse<salesResponse>
) => res.status(200).json({ allSales: sales });

const getTotalSales = async (req: NextApiRequest, res: NextApiResponse<totalSales>) =>
  res.status(200).json({ total_sales: 1560000 });

export default getAllTransactions;
