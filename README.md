# Crypto DCA Plan using Statistics

Welcome to the **Crypto DCA Plan using Statistics** repository! This tool is
designed to assist crypto enthusiasts in making informed dollar-cost averaging
(DCA) decisions. Here's a brief overview of what you can achieve with it.

## Features 🚀

### 1. Price Movement Visualizer 📈

- Visualize the price movement of any crypto trading pair.
- Specify your desired interval and number of points to get a comprehensive
  chart.
- Get a clear target price to purchase your chosen cryptocurrency.
- View the current Spot price.
- See how far the Spot price is from your target.
- Receive an instant suggestion on whether you should "buy the dip."

### 2. DCA Pair Suggester 🌌

- Get a curated list of the best trading pairs to DCA into.
- The default list can be extended or replaced using the Settings tab.
- Make the best DCA decisions with the most profitable trading pairs.

### 3. Optimal Price Predictor 🔮

- Discover the best possible prices over extended periods for your favorite
  trading pairs.
- The only varying factor is the period of the standard deviation, giving you a
  strategic edge.

### 4. Settings ⚙️

- Personalize your experience with the Crypto DCA Plan using Statistics.
- Feed in custom trading pairs via a JSON file.
- Extend or replace the default list of trading pairs.

## Development and Setup 🛠️

1. **Clone the repository**

```
git clone https://github.com/nushydude/crypto-stdev-cra
```

2. **Install dependencies**

```
npm ci
```

3. **Run the dev server**

```
npm run start
```

This will run the dev server, and the API will point to the deployed API.

To run the dev API:

1. **Clone the express repository**

```
git clone https://github.com/nushydude/crypto-stdev-express
```

2. Run it following its respective instructions.

3. **Change the API Endpoint** Update the `API_URI` in `src/config.ts` file to
   point to the local API.

## Usage 📖

1. **Price Movement Visualizer**: Enter your trading pair, set your desired
   interval and points, and visualize the data.
2. **DCA Pair Suggester**: Explore the suggested pairs or add your own via the
   Settings tab.
3. **Optimal Price Predictor**: Select your trading pair and discover the best
   prices over a long period.
4. **Settings**: Add, remove, or adjust trading pairs with a simple JSON file
   upload.

## Contributing 🤝

We welcome contributions! If you find any issues or would like to suggest
enhancements, please open an issue or submit a pull request.

## License 📄

MIT

---

Happy trading and may the odds be in your favor! 🌟
