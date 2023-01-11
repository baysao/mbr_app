const fs = require("fs");

var _continents = require("./continents.json");
console.log(_continents);
var _continents_map = _continents.reduce(function (_o, _i) {
  console.log(_i);
  _o[_i.value] = _i.id;
  return _o;
}, {});
console.log(_continents_map);
fs.readFile("./continents1.json", "utf8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  //    console.log(data)
  var _data = JSON.parse(data);
  console.log(_data);
  _data.map(function (_e) {
    console.log(_e.continent);
    console.log(_e.countries);
      var _c = _continents_map[_e.continent];
      console.log(_c);
	fs.writeFile("./continents/" + _c + ".json", JSON.stringify(_e.countries, null, 2), (error) => {
      if (error) {
        console.log('An error has occurred ', error);
        return;
      }
      console.log('Data written successfully to disk');
    });
  });
  //     console.log(data);
});
