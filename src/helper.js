export function useHelpers() {
    const containsUppercase = (value) => /[A-Z]/.test(value);
    const containsLowercase = (value) => /[a-z]/.test(value);
    const containsNumber = (value) => /[0-9]/.test(value);
    const containsSpecial = (value) => /[#?!@$()`~%^&*-+=]/.test(value);

    const formatCurrency = (str) => {
    return str.toLocaleString("en-US", {
      style: "currency",
      currency: "NGN",
    });
  };

  // Channel Selection
  const channelList = (cost) => {
    if (cost >= 400000) return ["bank_transfer", "bank"];
    else return ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"];
  };

  const generateRandomRef = () => {
    const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)
    return `iy67f${rand(10, 60)}hvc${rand(10, 90)}`
  }

    return {
        containsLowercase,
        containsNumber,
        containsUppercase,
        containsSpecial,
        formatCurrency,
        channelList,
        generateRandomRef
    };
}