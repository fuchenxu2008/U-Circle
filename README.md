# Subscribe/Unsubscribe Question

1. Recieve HTTP request from user through API end point.
2. Extract user ID and question ID to subscribe from request.
3. Find that question record by the given question ID in the database.
   1. Check if subscribers property of the question object includes the given user ID already.
   2. If given user ID already exists, remove it from the list to unsubscribe.
   3. If not, add given user ID to the list of subscribers of the question to subscribe.
4. Save the modified new question object back to the database.
5. On successful save, send the updated question as response to front end.
6. In case of any error, send errored response with status code 400 to front end.

# Search Question - Backend

1. Recieve HTTP request from user search query through API end point.
2. Extract type, major, keyword from request which refer to question properties.
3. Escape search query's special characters to avoid Regex(Regular Expression) evaluation errors.
4. If major or keyword appears to be empty, ignore it from search terms.
5. Find the matching questions based on the search terms using Regex(Regular Expression).
6. Send the result to user on success and error on failure.

# Notification - Backend

## Send Notification

1. When user answer a question, construct a notification object including information of the answerer, the user or users to be notified and the related question.
2. Pass the notification object and server websocket to the controller.
3. Iterate the target users group, for each of the users, send them a notification through websocket and create a record in database with the notification object and intialize its property markRead as false.

## Mark Notification as read

1. Find the notification model in database by given user ID and related question ID
2. For each question found, modify its property markRead to true.
3. Save the updated notification objects back to database.
