import type { NextApiRequest, NextApiResponse } from "next";
import { sales } from "../../../data";
import { totalResponse } from "./models";

const getAllTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse<totalResponse>
) => { 
  return res.status(200).json({ 
    totalSales: sales.reduce((accumulator, currentValue) => accumulator + currentValue.amount.value, 0), message: 'success' })
};

export default getAllTransactions