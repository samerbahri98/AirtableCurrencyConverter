import axios from "axios";
const convert = async (from, to, amount, callback1, callback2, currency) => {
  currency ? callback1(from) : callback1(amount);
  if (amount == 0) {
    callback2(0);
    return;
  }
  const result = await axios.get(
    `http://localhost:5000/api/convert/${from}/${to}/${amount}`
  );
  callback2(result.data.amount);
};

const validateNumber = (input) => {
  const regex = /^[0-9]*\.?[0-9]*$/;
  return regex.test(input);
};

const refresh = {
  amount: (from, to, amount, callback1, callback2) => {
    if (!amount) {
      callback1(0);
      callback2(0);
    } else if (validateNumber(amount))
      convert(from, to, amount, callback1, callback2, false);
  },
  currency: (from, to, amount, callback1, callback2) =>
    convert(from, to, amount, callback1, callback2, true),
};

export { convert, validateNumber,refresh };
