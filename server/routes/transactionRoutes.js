const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Route to initialize the database (fetch data from the third-party API)
router.get("/initialize", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.deleteMany(); // Clear old data
    await Transaction.insertMany(data); // Insert new data
    res.status(201).send("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).send("Error initializing database");
  }
});

// Route to list transactions with search and pagination
router.get("/", async (req, res) => {
  const { search = "", page = 1, perPage = 10 } = req.query;

  let query = {};

  // Apply search filter if there is a search term
  if (search.trim()) {
    query = {
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { price: { $regex: search, $options: "i" } },
      ],
    };
  }

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Error fetching transactions");
  }
});

// Route to get statistics (total sale, sold items, not sold items) for the selected month
router.get("/statistics", async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2024-${month}-01`); // Start of the month
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1); // End of the month

  try {
    // Calculate total sale amount for the selected month
    const totalSale = await Transaction.aggregate([
      {
        $match: { dateOfSale: { $gte: startDate, $lt: endDate }, isSold: true },
      },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    // Calculate total sold items
    const totalSold = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      isSold: true,
    });

    // Calculate total not sold items
    const totalNotSold = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      isSold: false,
    });

    res.json({
      totalSale: totalSale[0]?.total || 0,
      totalSold,
      totalNotSold,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).send("Error fetching statistics");
  }
});

// Route to get price range distribution for the selected month
router.get("/bar-chart", async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2024-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  try {
    const counts = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
          dateOfSale: { $gte: startDate, $lt: endDate },
          price: { $gte: range.min, $lt: range.max },
        });
        return { range: range.range, count };
      })
    );

    res.json(counts);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).send("Error fetching bar chart data");
  }
});

module.exports = router;
