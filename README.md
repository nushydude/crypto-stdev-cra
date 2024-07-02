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

## Checking out a branch and creating a pull request 🛠️

1. In Github project `Crypto DCA Plan using Statistics`, create a new issue.
   (https://github.com/users/nushydude/projects/1/views/1)
2. Assign the issue to yourself.
3. Open the issue and ceate a new branch from the issue under Development
   section.
4. Checkout the branch in your local repository. (It will show the command to
   checkout the branch)
5. Make changes in the branch.
6. Push the changes to the branch.
7. Create a pull request from the branch to the main branch.

## Deployment 🚀

1. When a commit it pushed to a branch, Vercel will deploy it to a preview URL.
   This is done via a Github action defined in
   .github/workflows/deploy-preview.yml. The preview URL will be available in
   "Deploy Project Artifacts to Vercel" step in the Github action.
2. Since there aren't any reviewers, the pull request can be merged by the
   author. Ensure that the preview URL is working as expected before merging.
3. When a pull request is merged to the main branch, Vercel will deploy it to
   the production URL. This is done via a Github action defined in
   .github/workflows/build-deploy.yml. The production URL will be available in
   "Deploy Project Artifacts to Vercel" step in the Github action.
4. The production URL is also available in the Vercel project dashboard and it
   is crypto-stdev-cra.vercel.app

## Tech Stack 🛠

1. ️Create React App
2. TypeScript
3. Chart.js
4. tailwindcss + a bit of Styled Components
5. Vercel

## Contributing 🤝

We welcome contributions! If you find any issues or would like to suggest
enhancements, please open an issue or submit a pull request.

## License 📄

MIT

---

Happy trading and may the odds be in your favor! 🌟
