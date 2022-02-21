import Realm from 'realm';

const appConfig = {
    id: '<Insert_App_Id>',
};

const app = new Realm.App(appConfig);
Realm.App.Sync.setLogLevel(app, 'all');

const email = 'abc@abc.com'
const password = 'abc123'

export const login = async () => {
    try {
        const credentials = Realm.Credentials.emailPassword(email, password);
        const user = await app.logIn(credentials);
        if (user) {
            console.log("You have successfully logged in as " + app.currentUser.id);
        } else {
            console.log("There was an error logging you in");
        }
    } catch (err) {
        console.log('Login failed', `${err.message}`);
    }
};

export function getAuthedUser() {
    return app.currentUser;
};