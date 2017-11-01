function capitalizeFirstLetterOnly(s){
  let result = s.charAt(0).toUpperCase() + s.slice(1);
  return result;
}

function titleCase(str) {
  return str
	  .toLowerCase()
	  .split(' ')
	  .map(function(word) {
	      return word[0].toUpperCase() + word.substr(1);
	  })
	  .join(' ');
}

const StringUtils = {
	capitalizeFirstLetterOnly:capitalizeFirstLetterOnly,
	titleCase:titleCase
}

module.exports = StringUtils;