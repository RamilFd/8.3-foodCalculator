let name = document.querySelector('#name');
let price = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add = document.querySelector('#add');

let table = document.querySelector('#table');
let total = document.querySelector('#total');

function createCell(tr, value, name) {
	let td = document.createElement('td');
	td.textContent = value;
	td.classList.add(name);
	tr.appendChild(td);
	return td;
}

add.addEventListener('click', function () {

	let tr = document.createElement('tr');

	redactCell(createCell(tr, name.value, 'name'));
	redactCell(createCell(tr, price.value, 'price'));
	redactCell(createCell(tr, amount.value, 'amount'));
	createCell(tr, price.value * amount.value, 'cost');

	createCell(tr, 'удалить', 'remove').addEventListener('click', function () {
		tr.remove();
		totalCost();
	})

	table.appendChild(tr);
	totalCost();
});

function totalCost() {

	let costs = document.querySelectorAll('.cost');
	let res = 0;
	costs.forEach(function (cost) {
		res += Number(cost.textContent);
		total.textContent = res;
	})

	if (costs.length < 1) {
		res = 0;
		total.textContent = res;
	}
}

function redactCell(td) {

	let input;
	td.addEventListener('dblclick', function () {
		input = document.createElement('input');
		input.value = td.textContent;
		td.textContent = '';
		td.appendChild(input);
		input.focus();

		input.addEventListener('keydown', function (event) {
			if (event.key == 'Enter') {
				td.textContent = input.value;
				input.remove();

				if (td.classList.contains('price') || td.classList.contains('amount')) {

					let prices = document.querySelectorAll('.price');
					let amounts = document.querySelectorAll('.amount');
					let costs = document.querySelectorAll('.cost');

					for (let i = 0; i < prices.length; i++) {
						costs[i].textContent = prices[i].textContent * amounts[i].textContent;
						totalCost();
					}
				}
			}
		})
	})
}
