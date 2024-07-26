const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db/user");
const { default: mongoose } = require("mongoose");

const router = express.Router();

//----------------------------balance fetch-------------------------//

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//-------------------transfer balance--------------------------//

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    if (!amount || amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    if (!to) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid recipient",
      });
    }

    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    const balanceLeft = await Account.findOne({
      userId: req.userId,
    });
    res.status(200).json({
      message: "Transfer successful",
      balance: balanceLeft.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during transfer:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
