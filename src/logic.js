const { db } = require("./db");

class logic {
  translateQuery(query) {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("sales") && lowerQuery.includes("total")) {
      return "SELECT SUM(amount) FROM sales";
    } else if (lowerQuery.includes("sales") && lowerQuery.includes("month")) {
      return "SELECT amount FROM sales WHERE month = ?";
    } else if (lowerQuery.includes("users")) {
      return "SELECT * FROM users";
    } else {
      throw new Error("Sorry, I can’t process that query .");
    }
  }

  executeQuery(pseudoSql) {
    if (pseudoSql.includes("SUM(amount)")) {
      const total = db.sales.reduce((sum, sale) => sum + sale.amount, 0);
      return { totalSales: total };
    } else if (pseudoSql.includes("month")) {
      const month = pseudoSql.match(/month = '(.+)'/i)?.[1] || "January";
      const sale = db.sales.find(
        (s) => s.month.toLowerCase() === month.toLowerCase()
      );
      return sale
        ? { month, amount: sale.amount }
        : { error: "That month isn’t in the data." };
    } else if (pseudoSql.includes("users")) {
      return db.users;
    }
    return { error: "No results found." };
  }

  explainQuery(pseudoSql) {
    return {
      originalSql: pseudoSql,
    };
  }
  validateQuery(query) {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("sales") || lowerQuery.includes("users")) {
      return { isValid: true, message: "Looks good!" };
    }
    return { isValid: false, message: "I can’t handle that query." };
  }
}

module.exports = new logic();
