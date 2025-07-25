export const PublicPromocodes = [];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getPromoCodes(startYear, startMonthIndex, endYear) {
  let idCounter = 1;

  for (let year = startYear; year <= endYear; year++) {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      if (year === startYear && monthIndex < startMonthIndex) continue;

      const month = monthNames[monthIndex].toUpperCase();
      const monthNumber = String(monthIndex + 1).padStart(2, "0");
      const yearSuffix = String(year).slice(-2);

      const startDate = `${year}-${monthNumber}-01`;
      const endDate = `${year}-${monthNumber}-${new Date(
        year,
        monthIndex + 1,
        0
      ).getDate()}`;

      PublicPromocodes.push({
        id: `PUBLIC-${String(idCounter).padStart(3, "0")}`,
        code: `${month}${yearSuffix}SALES25`,
        type: "percentage",
        value: 25,
        isActive: true,
        startDate,
        endDate,
        isPublic: true,
        usageLimit: 1,
        usedBy: [],
        maxDiscountPercentage: 25,
        minOrderAmount: 0,
      });

      idCounter++;
    }
  }
}

// Generate from May 2025 to Dec 2027
getPromoCodes(2025, 4, 2027); // 4 = May (0-indexed)
