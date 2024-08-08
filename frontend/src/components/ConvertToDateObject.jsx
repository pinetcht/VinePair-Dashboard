export function convertToDateObject(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Split the input string into month and year
    const [monthStr, yearStr] = dateString.split("-");

    // Get the month index (0-based)
    const monthIndex = months.indexOf(monthStr);

    // Convert year string to number
    const year = parseInt(yearStr, 10);

    if (monthIndex === -1 || isNaN(year)) {
      throw new Error("Invalid date format");
    }

    // Create a new Date object
    const date = new Date(year, monthIndex);
    const date_to_return = date.getTime();

    return date_to_return;
}