import type { NextApiRequest, NextApiResponse } from "next";
import { sales } from "../../../data";
import { salesResponse } from "./models";

const getAllTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse<salesResponse>
) => { 
  return res.status(200).json({ allSales: sales, message: 'success' })
};



export default getAllTransactions;
