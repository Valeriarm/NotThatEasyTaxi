//Valida un parametro para ver si cumple con el formato de fecha
var validateFecha = value => {
	value = value.split("-");
	console.log(value)
	if (isNaN(value[0])) {
	return false
	} else if (isNaN(value[1]) || value[1].length !== 2) {
	return false
	} else if (isNaN(value[2]) || value[2].length !== 2) {
	return false
	} else { return true }
}
//Valida un parametro para ver si cumple con el formato de placa
var validatePlaque = value => {
	if(value.length !== 6){
		return false
	}
	value = value.split('');
	const letters = /^[A-Z]+$/;
	if (!value[0].match(letters) || !value[1].match(letters) || !value[2].match(letters)) {
		return false;
	} else if (isNaN(value[3]) || isNaN(value[4]) || isNaN(value[5])) {
		return false;
	} else if (value[3].length !== 1 || value[4].length !== 1 || value[3].length !== 1){
		return false
	}
	else { return true }
}
//Valida un parametro para ver si cumple con el formato de placa
var validateScore = value => {
	if(value < 0 || value > 5){
		return false
	}
	else { return true }
}

module.exports = {
	validateFecha,
	validatePlaque,
	validateScore
}