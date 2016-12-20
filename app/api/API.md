# ACM Hack API 

This API was written so that data on the Hack website can easily be accessed and modified. Each API will return a JSON object, with a top-level field `success`, which indicated whether or not the request executed successfully or not. Always make sure to check this field before trying to use the returned data, or making further requests based on this one. The API assumes you are familiar with RESTful and CRUD models, and are comfortable manipulating JSON objects.

## Events

We display events on our homepage. The Events API provides an easy way to view, create, update, and delete events.

#### `GET /api/v1/event`

Finds and returns all ACM events.

The response format is a json object in the following format:

```json
{
  "success": true,
  "events": [
    {
      "id": "307e6d30-c556-11e6-9cb8-bb15b01c6e55",
      "date": {
        "start": "2016-12-18T19:10:33.251Z",
        "end": "2016-12-18T19:12:07.770Z"
      },
      "desc": "Learn Android in 7 weeks",
      "title": "Hack School Session 1",
      "location": "PAB 1425",
      "category": "Hack School",
      "tagline": "From Zero to Hero"
    },
    {
      "id": "07f6cbe0-c557-11e6-9329-11eadec086cd",
      "date": {
        "start": "2016-12-18T19:10:33.251Z",
        "end": "2016-12-18T19:12:07.770Z"
      },
      "desc": "Learn Android in 7 weeks: Part 2!",
      "title": "Hack School Session 2",
      "location": "PAB 1425",
      "category": "Hack School",
      "tagline": "From Zero to Hero"
    }
  ]
}
```

Each `date.start` and `date.end` can be converted into Javascript Date objects (see documentation) very easily by passing them to the constructor (`date.state = new Date(date.start)`), which will let you sort and filter the `events` array however you want.



#### `GET /api/v1/event/:eventID`

Find and return all events matching the given event ID. An example request to `GET /api/v1/event/307e6d30-c556-11e6-9cb8-bb15b01c6e55` would yield a response in the following format:

```JSON
{
  "success": true,
  "events": [
    {
      "id": "307e6d30-c556-11e6-9cb8-bb15b01c6e55",
      "date": {
        "start": "2016-12-18T19:10:33.251Z",
        "end": "2016-12-18T19:12:07.770Z"
      },
      "desc": "Learn Android in 7 weeks",
      "title": "Hack School Session 1",
      "location": "PAB 1425",
      "category": "Hack School",
      "tagline": "From Zero to Hero"
    }
  ]
}
```

Note that the response is still an array, and you need to access `events[0]`.



#### `POST /api/v1/event`

This API will let you create an event, provided you have the correct permission and the event data is not malformed.

The request body must follow the following schema:

```javascript
{
  token: { type: String, required: true },
  event: {
    date: {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
    },
    desc: { type: String },
    title: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    tagline: { type: String }
  }
}
```

Where `token` is a valid token, and the remaining fields contain the event information. You'll receive a response in the following format:

```JSON
{
  "success": true,
  "event": {
    "id": "a2c715f0-c66d-11e6-b91b-658ec3ef27fe",
    "date": {
      "start": "2016-12-18T19:10:33.251Z",
      "end": "2016-12-18T19:12:07.770Z"
    },
    "desc": "Learn Android in 7 weeks",
    "title": "Hack School Session 3",
    "location": "PAB 1425",
    "category": "Hack School",
    "tagline": "From Zero to Hero"
  }
}
```

If the request was successful, the `success` field will be set to true and you'll receive a copy of the newly-created event.