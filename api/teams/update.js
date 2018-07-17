import * as dynamoDbLib from '../libs/dynamodb-lib';
import {success, failure} from '../helpers/response';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'teams',
        Key: {
            userId: event.requestContext.userId,
            teamId: event.pathParameters.id,
        },
        UpdateExpression: 'SET content = :content, attachment= :attachment',
        ExpressionAttributeValues: {
            ':attachment': data.attachment ? data.attachment : null,
            ':content': data.content ? data.content: null,
        },
    };

    try {
        const result = await dynamoDbLib.call('update', params);

        callback(null, success({ status: true }));
    } catch(error) {
        callback(null, failure({ status: false }));
    }
}
