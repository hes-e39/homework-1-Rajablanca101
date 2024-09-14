import fetch from "node-fetch";

const fetchColors = async ({ name, hex, compName, compHex }) => {
  try {
    const response = await fetch("https://nt-cdn.s3.amazonaws.com/colors.json");
    const colors = await response.json();

    const filteredColors = colors.filter((color) => {
      // check the name
      const nameMatches = name
        ? color.name.toLowerCase() === name.toLowerCase()
        : false;

      // check the hex #
      const hexMatches = hex
        ? color.hex.toUpperCase() === hex.toUpperCase()
        : false;

      // check the compName
      const compNameMatches = compName
        ? color.comp.some(
            (compColor) =>
              compColor.name.toLowerCase() === compName.toLowerCase()
          )
        : false;

      // check the compHex #
      const compHexMatches = compHex
        ? color.comp.some(
            (compColor) => compColor.hex.toUpperCase() === compHex.toUpperCase()
          )
        : false;

      return hexMatches || nameMatches || compNameMatches || compHexMatches;
    });

    // console.log(JSON.stringify(filteredColors, null, 2));

    // Return the filtered colors
    return filteredColors;
  } catch (error) {
    // console.error("Error fetching or processing color data:", error);
    throw error; //
  }
};

// Example usage (for testing purposes):
(async () => {
  //   await fetchColors({ name: "Almond" });
  //   await fetchColors({ hex: "CD9575" });
  //   await fetchColors({ compName: "Black" });
  //   await fetchColors({ compHex: "D66B64" });
})();

export default fetchColors;
