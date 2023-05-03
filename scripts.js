const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

// Define a function to create an array with null values of a specified length
const createArray = (length) => {
    const result = [];

    // Use a loop to push null values into the array
    for (let i = 0; i < length; i++) {
        result.push(null);
    }

    return result;
};

// Define a function to create an array of weeks and days for a calendar
const createData = () => {
    // Get the current date and set it to the first day of the month
    const current = new Date();
    current.setDate(1);

    // Get the starting day of the week and the number of days in the month
    const startDay = current.getDay();
    const daysInMonth = getDaysInMonth(current);

    // Create arrays to hold the weeks and days

    const weeks = createArray(5);
    const days = createArray(7);

    // Initialize a variable to hold the current result
    let result = null;

    // Loop through each week in the calendar
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {

        // Create a new object to hold the week number and days
        result = {
            week: weekIndex + 1,
            days: [],
        };

        // Loop through each day in the week
        for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {

            // Calculate the day number and check if it's a valid day in the month
            const day = dayIndex - startDay + 1;
            const isValid = day > 0 && day <= daysInMonth;


            // Add the day object to the week
            result.days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : null,
            });
        }

        // Add the week object to the weeks array
        weeks[weekIndex] = result;
    }

    return weeks;
};


// Define a function to add a cell to an HTML table
const addCell = (existing, classString, value) => {
    const result = /* html */ `
        <td class="${classString}">
            ${value}
        </td>

        ${existing}
    `;

    return result;
};

// Define a function to create the HTML for a calendar
const createHtml = (data) => {
    let result = '';


    // Loop through each week in the data
    for (let i = 0; i < data.length; i++) {
        const week = data[i];
        let inner = '';

        // Add the week number to the first cell in the row
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week.week}`);

        // Loop through each day in the week
        for (let j = 0; j < week.days.length; j++) {
            const day = week.days[j];

            // Initialize variables for cell classes and conditions
            let classString = 'table__cell';
            const isToday = new Date().getDate() === day.value;
            const isWeekend = day.dayOfWeek === 1 || day.dayOfWeek === 7;
            const isAlternate = week.week % 2 !== 0;


             // Add classes for today, weekends, and alternating weeks
            if (isToday) classString = `${classString} table__cell_today`;
            if (isWeekend) classString = `${classString} table__cell_weekend`;
            if (isAlternate) classString = `${classString} table__cell_alternate`;

            inner = addCell(inner, classString, day.value);
        }
        

        result += `<tr>${inner}</tr>`;
    }

    return result;
};


// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)