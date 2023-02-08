const user1 = {
  name: "John",
  age: 30,
  email: "john@john.com",
  location: "London",
};

function des({ name, age, email, location }) {
  const newUser1 = {
    name,
    age,
    ...(email && { email }),
    location,
  };

  console.log(newUser1);
}

des(user1);
