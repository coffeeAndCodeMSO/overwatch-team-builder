import * as dynamoDbLib from '../libs/dynamodb-lib';

import {success, failure} from '../helpers/response';

export async function main(event, context, callback) {
    const params = {
        TableName: 'teams',
        Key: {
            userId: event.requestContext.userId,
            teamId: event.pathParameters.id,
        },
    };

    try {
        const result = await dynamoDbLib.call('get', params);
        if (result.Item) {
            callback(null, success(result.Item));
        } else {
            callback(null, failure({ status: false, error: 'Item not found'}));
        }
    } catch(error) {
        callback(null, failure({ status: false }));
    }
}