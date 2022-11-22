const User = require("./User");

const data = {
    apps: [
        { id: 1, title: "Lorem", published: true, userId: 123 },
        { id: 2, title: "Ipsum", published: false, userId: 123 },
        { id: 3, title: "Dolor", published: true, userId: 456 },
        { id: 4, title: "Sit", published: true, userId: 789 },
        { id: 5, title: "Amet", published: false, userId: 123 },
        { id: 6, title: "Et", published: true, userId: 123 },
    ],
    organizations: [
        { id: 1, name: "Google", suspended: true, userId: 123 },
        { id: 2, name: "Apple", suspended: false, userId: 456 },
        { id: 3, name: "Fliplet", suspended: false, userId: 123 },
    ],
};

const user = new User(data);

user
.select("apps")
.attributes(["id", "title"])
.where({ published: true })
.order("title")
.findAll()
.then((result) => {
    console.log(result);
});

user
.select("organizations")
.attributes(["name"])
.where({ suspended: false })
.findOne()
.then(function (organization) {
    console.log(organization);
});
