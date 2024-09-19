let entries = JSON.parse(localStorage.getItem('enteries')) || [];

const entryForm = document.getElementById('entryForm');
const entriesTable = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
const totalIncomeElement = document.getElementById('totalIncome');
const totalExpensesElement = document.getElementById('totalExpenses');
const balanceElement = document.getElementById('balance');
const filterType = document.getElementById('filterType');
const filterCategory = document.getElementById('filterCategory');

entryForm.addEventListener('submit', addEntry);
filterType.addEventListener('change',renderEntries);
filterCategory.addEventListener('change',renderEntries);

function saveEnteries() {
    localStorage.setItem('enteries', JSON.stringify(entries));
}

function updateBalance() {
    let totalIncome = 0;
    let totalExpenses = 0;

    entries.forEach(entry => {
        if (entry.type === 'income') totalIncome += Number(entry.amount);
        else totalExpenses += Number(entry.amount);
    })

    let totalBalance = totalIncome - totalExpenses;

    totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
    balanceElement.textContent = `$${totalBalance.toFixed(2)}`;
    totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;
}

function deleteEntry(index){
    entries.splice(index, 1);
    saveEnteries();
    renderEntries();
    updateBalance();
}

function renderEntries() {
    entriesTable.innerHTML = '';
    const filterTypeValue = filterType.value;
    const filterCategoryValue = filterCategory.value;
    console.log(filterTypeValue)
    console.log(filterCategoryValue)
    entries.forEach((entry, index) => {
        if (
            (filterCategoryValue === "all" || entry.category === filterCategoryValue) &&
            (filterTypeValue === 'all' || filterTypeValue === entry.type)) {
            const row = entriesTable.insertRow();
            row.innerHTML = `           
            <td>${entry.description}</td>
            <td>$${entry.amount}</td>
            <td>${entry.type}</td>
            <td>${entry.category}</td>
            <td>
                <button onclick="editEntry(${index})">Edit</button>
                <button onclick="deleteEntry(${index})">Delete</button>
            </td>`;
        }
    })
    entryForm.reset();
}

function addEntry(e) {
    e.preventDefault();
    const description = document.querySelector('#description').value.trim();
    const amount = document.querySelector('#amount').value.trim();
    const type = document.querySelector('#type').value.trim();
    const category = document.querySelector('#category').value.trim();

    console.log(description, amount, type, category);
    if (description && amount && type && category) {
        const entry = {
            description,
            amount,
            type,
            category
        }
        entries.push(entry);
        saveEnteries();
        renderEntries();
        updateBalance();
    }
}
function editEntry(index) {
    const entry = entries[index];
    entryForm.description.value = entry.description;
    entryForm.amount.value = entry.amount;
    entryForm.type.value  = entry.type;
    entryForm.category.value  = entry.category;
    editingIndex = index; 
    entries.splice(index, 1);
    
}

renderEntries();
updateBalance();