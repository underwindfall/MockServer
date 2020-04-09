class ModifierManager {
	constructor(modifiers, routes, tableId) {
		this.uuid = 0
		this.routes = routes
		
		this.table = document.getElementById(tableId)
	}
	
	buildRow() {
		let row = document.createElement('tr')
		row.id = "modifier-" + this.uuid++
		row.className = "modifier-item"
		
		let routeCol = document.createElement('td')
		let routeSelect = document.createElement('select')
		this.routes.forEach(route => {
			let option = document.createElement('option')
			option.value = route
			option.innerHtml = route
			routeSelect.appendChild(option)
		})
		routeCol.appendChild(routeSelect)
		
		let valueCol = document.createElement('td')
		
	}
}