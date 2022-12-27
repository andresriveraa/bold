import type { NextApiRequest, NextApiResponse } from "next";
import { sales } from "../../../data";
import { salesItem, salesRequest, salesResponse } from "./models";

const getAllTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse<salesResponse>
) => {
  let {
    query: { timeline, link_pago, datafono },
  } = req;

  const linkPago = Number(link_pago);
  const Datafono = Number(datafono);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date: Date) => {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  };

  const getLastWeek = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    return formatDate(d);
  });

  const getLastMonth = [...Array(30)].map((_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    return formatDate(d);
  });

  const filterDataToday = (i: salesItem) => {
    return formatDate(new Date(i.date)) === formatDate(today);
  };

  const filterDataWeek = (i: salesItem) => {
    return (
      formatDate(new Date(i.date)) >= getLastWeek[6] &&
      formatDate(new Date(i.date)) <= getLastWeek[0]
    );
  };

  const filterDataMonth = (i: salesItem) => {
    return (
      formatDate(new Date(i.date)) >= getLastMonth[29] &&
      formatDate(new Date(i.date)) <= getLastMonth[0]
    );
  };

  const filteredData = (i: salesItem) => {
    switch (timeline) {
      case "hoy":
        return filterDataToday(i);
      case "semana":
        return filterDataWeek(i);
      case "mes":
        return filterDataMonth(i);
      default:
        return filterDataToday(i);
    }
  };

  if (!linkPago && !Datafono) {
    return res
      .status(200)
      .json({
        allSales: sales.filter((transaction: salesItem) =>
          filteredData(transaction)
        ),
        message: "success",
      });
  } else if (linkPago && Datafono) {
    return res
      .status(200)
      .json({
        allSales: sales.filter((transaction: salesItem) =>
          filteredData(transaction)
        ),
        message: "success",
      });
  } else if (linkPago) {
    return res.status(200).json({
      allSales: sales.filter((transaction: salesItem) => {
        const period = filteredData(transaction);
        return transaction?.payment_type === "link de pago" && period;
      }),
      message: "success",
    });
  } else if (Datafono) {
    return res.status(200).json({
      allSales: sales.filter((transaction: salesItem) => {
        const period = filteredData(transaction);
        return transaction?.payment_type === "datafono" && period;
      }),
      message: "success",
    });
  }
};

export default getAllTransactions;
