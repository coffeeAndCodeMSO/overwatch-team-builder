import * as dynamoDbLib from '../libs/dynamodb-lib';
import {success, failure} from '../helpers/response';

export async function main(event, context, callback) {
    const params = {
        TableName: 'teams',
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': event.requestContext.userId,
        },
    };

    try {
        const result = await dynamoDbLib.call("query", params);

        callback(null, success(result.Items));
    } catch(error) {
        callback(null, failure({ status: false }));
    }
}