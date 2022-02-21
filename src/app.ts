import Realm from 'realm';
import { ObjectId } from 'bson';

import { TaskSchema } from './schema';
import * as users from './users'

let realms: any;

const openRealm = async (partitionKey: string) => {
    const config: Realm.Configuration = {
        schema: [TaskSchema],
        sync: {
            user: users.getAuthedUser(),
            partitionValue: partitionKey
        }
    };
    return Realm.open(config);
};

const getRealm = async (partitionKey: string) => {
    if (realms[partitionKey] === undefined) {
        realms[partitionKey] = openRealm(partitionKey);
    }
    return realms[partitionKey];
};

const createNewTask = async () => {
    try {
        const realm = await getRealm(`${users.getAuthedUser().id}`);
        let task;
        realm.write(() => {
            task = realm.create("Task", { _id: new ObjectId(), todo: "Get Realm to sync with Atlas" })
        })
    } catch (error) {
        console.log(error);
    }
}

const run = async () => {
    await users.login();
    await createNewTask();
}

run().catch((err) => {
    console.log(JSON.stringify(err));
});