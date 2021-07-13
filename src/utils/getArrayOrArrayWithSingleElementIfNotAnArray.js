const getArrayOrArrayWithSingleElementIfNotAnArray = (elementOrArray) => {
	if (Array.isArray(elementOrArray)) return elementOrArray;

	if (!elementOrArray) return [];

	return [elementOrArray];
};

module.exports = { getArrayOrArrayWithSingleElementIfNotAnArray };
