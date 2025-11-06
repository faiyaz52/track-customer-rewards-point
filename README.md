# React 19 dashboard to track customer reward points

## Project Setup
1. Clone the repo from GitHub.(https://github.com/faiyaz52/track-customer-rewards-point)
2. Run `npm install` to install dependencies (includes styled-components, pino, prop-types).
3. Place the mock data in `public/data/transactions.json`.
4. Run `npm run dev` to start the development server (opens at http://localhost:3000 || http://localhost:5173).

## How to Run the Application
Step-by-Step Guide
Select a Customer:
Choose a customer from the dropdown (or table list). The dashboard will automatically display that customer’s reward summary.
Default View (Last 3 Months):
On launch, the app automatically shows data for the last 3 months based on the current month (e.g., as of November 2025, it shows Sep–Nov 2025 data).
Filter Options:
Use the Month and Year dropdowns to filter data.
You can toggle between:
“Last 3 Months” summary, or
A specific month/year to view that month’s details.
Monthly Breakdown:
The dashboard shows a monthly reward points summary. Click on any month to drill down into that month’s transactions.
Transaction Details:
Displays all transactions for the selected month with amount and calculated reward points.
Pagination is included to handle larger datasets.
No Data Handling:
If no transactions exist for the chosen filter, the app displays a clear message — “No transactions”.

## Component Details
- **CustomerSelect**: Dropdown to select customer.
- **FilterControls**: Dropdowns for month and year filter.
- **RewardSummary**: Displays points per month and total; clickable months.
- **TransactionTable**: Paginated table of transactions with points.

## Working Screenshots
(Placeholder: In a real repo, add images here.)
- Screenshot 1: Customer selection and default last 3 months summary.
- Screenshot 2: Specific month filter with transactions table.
- Screenshot 3: No transactions message.
- Screenshot 4: Pagination in action.

## Test Case Success Screenshots
(Placeholder: Run `npm test` and capture console output.)
- All 6 tests pass: 3 positive (whole/fractional calculations), 3 negative (invalid inputs).

### Tech Stack

```json
React 19 + Vite 7
styled-components 6
Pino 10 (production logger)
React Compiler (zero re-renders)
Jest + React Testing Library
