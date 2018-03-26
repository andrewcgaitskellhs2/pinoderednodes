var data = 
    {"cars": {
        "Nissan": {
            "Sentra": {"doors":4, "transmission":"automatic"},
            "Maxima": {"doors":4, "transmission":"automatic"}
        },
        "Ford": {
            "Taurus": {"doors":4, "transmission":"automatic"},
            "Escort": {"doors":4, "transmission":"automatic"}
        }
    }
}

console.debug(data.cars['Nissan']['Sentra'].doors)  // 4
console.debug(data.cars['Nissan']['Maxima'].doors)  // 4
console.debug(data.cars['Nissan']['Maxima'].transmission)   // automatic

data.cars['Ford']['Van'] = {}

data.cars['Ford']['Van'].transmission = "manual"

data.cars['Ford']['Car'] = {}

data.cars['Ford']['Car'].transmission = "manual"

var mymake = 'Ford'
var mykind = 'Car'

console.debug(data.cars[mymake][mykind].transmission)

carstring = JSON.stringify(data);

console.debug(carstring)

/*
var data = 
    {"cars": {
        "Nissan": {
            "Sentra": {"doors":4, "transmission":"automatic"},
            "Maxima": {"doors":4, "transmission":"automatic"}
        },
        "Ford": {
            "Taurus": {"doors":4, "transmission":"automatic"},
            "Escort": {"doors":4, "transmission":"automatic"}
        }
    }
}
*/

var mydata = {}
mydata["runid"] = {}
mydata["runid"][1] = {}
mydata["runid"][1] = 1
mydata[1] = 1
mydata[2] = 2


mystring = JSON.stringify(mydata);

console.debug(mystring)

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}
var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");


var mydb = {}
mydb["John"] = myFather
mydb["Sally"] = myMother


mystring = JSON.stringify(mydb);

console.debug(mystring)
