exports.dbConfig = {
    "prd": {
        'connectionType': 'singleInstance',
        'username': '',
        'password': '',
        'hosts': ['localhost:27017'],
        'databaseName': 'FindHotel',
        'ipDetailsColl': 'Test'
    },
    "loc": {
        'connectionType': 'singleInstance',
        'username': '',
        'password': '',
        'hosts': ['mongo'], //mongo
        'databaseName': 'FindHotel',
        'ipDetailsColl': 'Test'
    }
};