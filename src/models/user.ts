class User {
    id: number;
    user: string;
    password: string;
    name: string;
    lastName: string;
    email: string;
    token: string;
    ip: string;

    constructor(
        id: number,
        user: string,
        password: string,
        name: string,
        lastName: string,
        email: string,
        token = "",
        ip = ""
    ) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.token = token;
        this.ip = ip;
    }
}