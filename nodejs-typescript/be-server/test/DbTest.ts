import {UserCredentialsDbAccess} from "../src/auth/UserCredentialsDbAccess";
import {UserDbAccess} from "../src/auth/dbAccessor/UserDbAccess";
import {WorkingPosition} from "../src/models/User";

class DbTest {

    public db: UserCredentialsDbAccess = new UserCredentialsDbAccess();
    public userDb: UserDbAccess = new UserDbAccess();
}

// new DbTest().db.putUserCredentials(
//     {
//         username: 'moeenaslam',
//         password: 'password1',
//         accessRight: [
//             1,2,3
//         ]
//     }
// )

new DbTest().userDb.putUser({
    dateOfBirth: new Date(Date.parse("1995-12-05")),
    email: 'moeen.aslam@northbaysolutions.net',
    id: 'abc123',
    name: 'Moeen Aslam',
    position: WorkingPosition.SSE
})