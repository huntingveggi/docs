interface Person {
  name: string;
}

function greeter(person: Person) {
  return "Hello, " + person.name;
}

// var user = "Jane User";
var user = {
  name: "John"
}

	greeter(user);
