import { openDB } from 'idb';

const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('UPDATE content in the database');
    //console.log(content);

    // Create a connection to the database database and version we want to use.
    const jateDb = await openDB('jate', 1);

    const request = jateDb
        .transaction('jate', 'readwrite')
        .objectStore('jate')
        .put({ id: 0, content: content });

    request.onsuccess = async () => {
        const result = await request.result;
        console.log('PUT successful', result);
        return result;
    }

    request.onerror = (err) => {
        console.error(`Error to PUT db information: ${err}`)
    }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('GET from the database');

    // Create a connection to the database database and version we want to use.
    const jateDb = await openDB('jate', 1);

    const request = jateDb
        .transaction('jate', 'readonly')
        .objectStore('jate')
        .get('0');

    request.onsuccess = async () => {
        const result = await request.result;
        console.log('GET successful', result);
        return result;
    }

    request.onerror = (err) => {
        console.error(`Error to GET db information: ${err}`)
    }
}

initdb();
