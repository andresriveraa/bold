export type totalSales = {
  total_sales: number;
};

export interface amount {
  value: number;
  deduction?: number;
}

export interface salesItem {
  id: string;
  transaction: string;
  date : string;
  payment_method: string;
  transction_id: string;
  payment_type: string;
  amount: amount;
}

export interface salesResponse { allSales: salesItem[], message: string}
export interface totalResponse { totalSales: number, message: string}
export interface salesRequest { link_pago: string, datafono: string, timeline: string}


