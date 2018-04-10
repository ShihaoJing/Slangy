const mongoose = require("mongoose");
const User = require("./models/user");

var data = [
    {
        username: "Tom",
        fullname: "Tom Hanks",
        password: "123",
        email: "tom@qq.com",
        phone: "111-222-333",
        gender: "Male",
        birth: "01-01-1900",
        languages: ["English", "Spanish"]
    },
    {
        username: "Jerry",
        fullname: "Jerry Jhons",
        password: "123",
        email: "jerry@qq.com",
        phone: "444-555-666",
        gender: "Male",
        birth: "01-01-1990",
        languages: ["LanZhouHua", "SiChuanHua"]
    },
    {
        username: "Emma",
        fullname: "Emma Watson",
        password: "123",
        email: "emma@qq.com",
        phone: "777-888-999",
        gender: "Female",
        birth: "04-15-1990",
        languages: ["Chinese"]
    }
];

function seedDB() {
    //Remove all Users
    User.remove({})
        .then(() => {
            return User.collection.insert(data);
        })
        .then((users) => {
            console.log(users);
        })
        .catch(err => console.log(err));
}

module.exports = seedDB;