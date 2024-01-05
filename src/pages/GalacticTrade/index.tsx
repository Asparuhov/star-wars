// GalacticTradeCalculator.js
import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  styled,
  Select,
  MenuItem,
} from "@mui/material";
import Chart from "components/Common/Chart"; // Import Chart component
import { currencies } from "types/common";

type ExchangeRates = {
  [key in currencies]: number;
};

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 600,
  height: 640,
  [theme.breakpoints.down("sm")]: {
    width: 400,
    marginTop: 65,
  },
  marginTop: 100,
  backgroundColor: "white",
  borderRadius: "8px",
}));

const GalacticTradeCalculator = () => {
  const initialExchangeRates: ExchangeRates = {
    [currencies.GALACTICCREDITS]: 1.0,
    [currencies.WUPIUPI]: 2.5,
    [currencies.PEGGATS]: 0.8,
  };

  const [exchangeRates, setExchangeRates] =
    useState<ExchangeRates>(initialExchangeRates);
  const [transactions, setTransactions] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<currencies>(
    currencies.WUPIUPI
  );

  const [isButtonClickable, setIsButtonClickable] = useState(true);

  const handleBuy = (currency: currencies) => {
    if (isButtonClickable) {
      updateExchangeRates(currency, 0.1);
      updateButtonStatus();
      setTransactions([...transactions, `Bought ${currency}`]);
    }
  };

  const handleSell = (currency: currencies) => {
    if (isButtonClickable) {
      updateExchangeRates(currency, -0.1);
      updateButtonStatus();
      setTransactions([...transactions, `Sold ${currency}`]);
    }
  };

  const updateExchangeRates = (currency: currencies, delta: number) => {
    setExchangeRates((prevRates) => {
      const newExchangeRates: ExchangeRates = { ...prevRates };

      // Simulate exchange rate changes based on supply and demand
      newExchangeRates[currency] += delta;

      // Adjust other currencies as well
      Object.keys(newExchangeRates).forEach((c) => {
        if (c !== currency) {
          // Simulate interconnected impact on other currencies
          newExchangeRates[c as currencies] += delta * 0.1;
        }
      });

      return newExchangeRates;
    });
  };

  const updateButtonStatus = () => {
    setIsButtonClickable(false);
    setTimeout(() => {
      setIsButtonClickable(true);
    }, 1000); // Set the cooldown time (1 second in this case)
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate gradual exchange rate changes over time
      const newExchangeRates: ExchangeRates = { ...exchangeRates };
      Object.keys(newExchangeRates).forEach((currency) => {
        newExchangeRates[currency as currencies] += (Math.random() - 0.5) * 0.1;
      });
      setExchangeRates(newExchangeRates);
    }, 2000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [exchangeRates]);

  return (
    <StyledContainer>
      <Typography
        textAlign="center"
        variant="h3"
        sx={{ color: "#1976D2" }}
        mb={5}
      >
        Galactic Trade Calculator
      </Typography>

      <Typography variant="h4" sx={{ color: "#1976d2" }}>
        Exchange Rates:
      </Typography>
      <ul>
        {Object.entries(exchangeRates).map(([currency, rate]) => (
          <li key={currency} style={{ color: "#1976D2" }}>
            {currency}: {rate.toFixed(2)}
          </li>
        ))}
      </ul>

      <Select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value as currencies)}
        sx={{ color: "#1976D2", marginBottom: 3 }}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>

      {/* Include Chart component with necessary props */}
      <Chart
        key={selectedCurrency}
        currency={selectedCurrency}
        exchangeRates={exchangeRates}
      />

      <ButtonContainer>
        <Button
          variant="contained"
          onClick={() => handleBuy(selectedCurrency)}
          disabled={!isButtonClickable}
        >
          Buy {selectedCurrency}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleSell(selectedCurrency)}
          disabled={!isButtonClickable}
        >
          Sell {selectedCurrency}
        </Button>
      </ButtonContainer>
    </StyledContainer>
  );
};

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  gap: 38,
});

export default GalacticTradeCalculator;
