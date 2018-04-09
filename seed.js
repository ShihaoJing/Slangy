const mongoose = require("mongoose");
const User = require("./models/user");

var data = [
    {
        name: "Tom",
        password: "123",
        email: "tom@qq.com",
        phone: "111-222-333",
        gender: "Male",
        birth: "01-01-1900",
        languages: ["English", "Spanish"]
    },
    {
        name: "Jerry",
        password: "123",
        email: "jerry@qq.com",
        phone: "444-555-666",
        gender: "Male",
        birth: "01-01-1990",
        languages: ["LanZhouHua", "SiChuanHua"]
    },
    {
        name: "Emma Waston",
        password: "123",
        email: "emma@qq.com",
        phone: "777-888-999",
        gender: "Female",
        birth: "04-15-1990",
        languages: ["Chinese"]
    }
];

async function seedDB() {
    //Remove all Users
    await User.remove({});
    await mongoose.connection.dropDatabase();
    for (var i = 0; i < data.length; i++) {
        await User.create(data[i]);
    }
}

module.exports = seedDB;