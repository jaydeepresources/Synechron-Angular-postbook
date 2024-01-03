export class User {
    userId: number
    userName: string
    userEmail: string
    userPassword: string

    constructor(userId: number, userName: string, userEmail: string, userPassword: string) {
        this.userId = userId
        this.userName = userName
        this.userEmail = userEmail
        this.userPassword = userPassword
    }

}