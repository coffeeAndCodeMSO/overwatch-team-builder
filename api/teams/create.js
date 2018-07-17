import uuid from 'uuid';
import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../helpers/response.js';

/**
 * To test use the following console command:
 * serverless invoke local --function create --path mocks/teams/create-event.json
 */

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'teams',
        Item: {
            userId: event.requestContext.userId,
            teamId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now(),
        },
    };

  try {
      await dynamoDbLib.call("put", params);
      callback(null, success(params.Item));
  } catch (error) {
      console.log(error);
      callback(null, failure({ status: false }));
  }
}