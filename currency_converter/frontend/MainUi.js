import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  SelectButtons,

} from "@airtable/blocks/ui";
import LocalConverter from "./LocalConverter";
import RecordConverter from "./RecordConverter";
import TableConverter from "./TableConverter";
import { convert, refresh } from "./logic";

const MainUi = () => {

  const [currencies, setCurrencies] = useState([]);
  const [base, setBase] = useState("EUR");
  const [desired, setDesired] = useState("USD");
  const [amountTop, setAmountTop] = useState(1);
  const [amountBottom, setAmountBottom] = useState(1);

  useEffect(() => {
    if (currencies.length === 0) {
      const options = [];
      axios.get("http://localhost:5000/api/list").then((list) => {
        list.data.forEach((elem) => options.push({ value: elem, label: elem }));
        setCurrencies(options);
      });
    }
    convert("EUR", "USD", 1, setAmountTop, setAmountBottom, false);
  }, []);

  const update = {
    top: (value) =>
      refresh.amount(base, desired, value, setAmountTop, setAmountBottom),
    bottom: (value) =>
      refresh.amount(desired, base, value, setAmountBottom, setAmountTop),
    from: (value) =>
      refresh.currency(value, desired, amountTop, setBase, setAmountBottom),
    to: (value) =>
      refresh.currency(value, base, amountBottom, setDesired, setAmountTop),
  };

  const [tab, setTab] = useState("LocalConverter");
  const options = [
    { value: "LocalConverter", label: "Local" },
    { value: "RecordConverter", label: "Record" },
    { value: "TableConverter", label: "Table" },
  ];
  const Components = { LocalConverter, RecordConverter, TableConverter };
  return (
    <>
      <SelectButtons
        value={tab}
        onChange={(newValue) => setTab(newValue)}
        options={options}
      />
      {React.createElement(Components[tab], {
        currencies,
        base,
        desired,
        amountTop,
        amountBottom,
        update,
      })}
    </>
  );
};

export default MainUi;
