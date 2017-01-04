<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [ACM Hack API](#acm-hack-api)
  - [Events](#events)
      - [`GET /api/v1/event`](#get-apiv1event)
      - [`GET /api/v1/event/:eventID`](#get-apiv1eventeventid)
      - [`POST /api/v1/event`](#post-apiv1event)
      - [`PATCH /api/v1/event/:eventID`](#patch-apiv1eventeventid)
      - [`DELETE /api/v1/event`](#delete-apiv1event)
      - [`DELETE /api/v1/event/:eventID`](#delete-apiv1eventeventid)
  - [Showcase Projects](#showcase-projects)
      - [`GET /api/v1/showcase`](#get-apiv1showcase)
      - [`GET /api/v1/showcase/:projectID`](#get-apiv1showcaseprojectid)
      - [`POST /api/v1/showcase`](#post-apiv1showcase)
      - [`PATCH /api/v1/showcase/:projectID`](#patch-apiv1showcaseprojectid)
      - [`DELETE /api/v1/showcase`](#delete-apiv1showcase)
      - [`DELETE /api/v1/project/:projectID`](#delete-apiv1projectprojectid)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

[TOC]

# ACM Hack API

This API was written so that data on the Hack website can easily be accessed and modified. A few notes:

- Each API will return a JSON object, with a top-level field `success`, which indicated whether or not the request executed successfully or not.
  - Always make sure to check this field before trying to use the returned data, or making further requests based on this one.
- All dates are in GMT ISO format. The Javascript `Date` class' default constructor can automatically convert it to a `Date` object. Make sure any dates displayed are converted to the user's local time zone.
- This API assumes you are familiar with RESTful and CRUD models.
- This API assumes you are comfortable manipulating JSON objects.

  
## Events

We display events on our homepage. The Events API provides an easy way to view, create, update, and delete events.

#### `GET /api/v1/event`

Finds and returns all ACM events.

The response format is a json object in the following format:

```json
{
  "success": true,
  "error": null,
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
  "error": null,
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

Note that the response is still an array, and you need to access `events[0]`. Also, if there are no events with the specified ID, **the `success` field may still be `true`**. Make sure you check the length of `events` before trying to access it.



#### `POST /api/v1/event`

Create an event, provided you have the correct permission and the event data is not malformed.

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
  "error": null,
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



#### `PATCH /api/v1/event/:eventID`

Update an existing event, provided you have the correct permission, a valid event format, and an existing event ID. The schema for the request is the same as the `POST` request on this route, except the `id` field is ignored and you **only need to specify the fields that you wish to update**. In other words, this request **applies a delta to an existing event**. To specify which event to update, specify its ID as `:eventID` in the URL. For example, a request `PATCH /api/v1/event/a2c715f0-c66d-11e6-b91b-658ec3ef27fe` (note that this is the newly-created event from the `POST` request above) with the following body:

```json
{
  "token": "[Authorization token here]",
  "event": {
    "desc": "Learn Android in 7 weeks. This week's topic: Java."
  }
}
```

would be applied to the object shown in the `POST` request above. In response, you might expect something in the form of:

```json
{
  "success": true,
  "error": null,
  "event": {
    "id": "a2c715f0-c66d-11e6-b91b-658ec3ef27fe",
    "date": {
      "start": "2016-12-18T19:10:33.251Z",
      "end": "2016-12-18T19:12:07.770Z"
    },
    "desc": "Learn Android in 7 weeks. This week's topic: Java.",
    "title": "Hack School Session 3",
    "location": "PAB 1425",
    "category": "Hack School",
    "tagline": "From Zero to Hero"
  }
}
```



#### `DELETE /api/v1/event`

Deletes all events currently in the database. Requires a token in the body:

```json
{
  "token": "[Authorization Token here]"
}
```

You'll receive a response in the following format:

```json
{
  "success": true,
  "removed": 7
}
```

Where `success` indicates whether or not the request was successful, and `removed` indicates how many records were removed.



#### `DELETE /api/v1/event/:eventID`

This request is identical to the previous `DELETE` request, except it specifies an event ID to delete through the URL (in place of `:eventID`), and only removes that event.



## Showcase Projects

We also display showcase projects on our website. The API to view, create, update, and delete showcase projects is identical to the the events API, except that the schema of a showcase project is different.



#### `GET /api/v1/showcase`

This request will return an object containing an array of all showcase projects. The response will be in the following format:

```json
{
  "success": true,
  "error": null,
  "projects": [
    {
      "id": "1653fac0-c712-11e6-b0e4-fd8b404bc168",
      "date": "2016-12-21T00:11:57.932Z",
      "desc": "An API for ACM Hack to view, create, update, and delete showcase projects",
      "image": "/some/image/url.png",
      "link": "/api/v1/showcase",
      "title": "Hack Showcase API",
      "contributors": [
        "Nikhil Kansal",
        "Yvonne Chen",
        "Justin Liu"
      ]
    },
    {
      "id": "8891a468-f32c-4e75-a434-8ced1df9183a",
      "date": "2016-12-22T05:47:15.722Z",
      "desc": "The dashboard for hack school students to complete hack school tasks",
      "image": "/some/image/url.png",
      "link": "http://hackucla.com/hackschool",
      "title": "Hack School Dashboard",
      "contributors": [
        "Nikhil Kansal",
        "Justin Liu",
        "Yvonne Chen"
      ]
    }
  ]
}
```

The response has a top-level field `success` which indicates whether or not the request could be fulfilled successfully. It should be checked before any further operations are conducted.



#### `GET /api/v1/showcase/:projectID`

Find and return all projects that match a specific project ID (specified in place od `:projectId`). For example, a request to `GET /api/v1/showcase/1653fac0-c712-11e6-b0e4-fd8b404bc168` might result in a response in the following format:

```Json
{
  "success": true,
  "error": null,
  "projects": [
    {
      "id": "1653fac0-c712-11e6-b0e4-fd8b404bc168",
      "date": "2016-12-21T00:11:57.932Z",
      "desc": "An API for ACM Hack to view, create, update, and delete showcase projects",
      "image": "/some/image/url.png",
      "link": "/api/v1/showcase",
      "title": "Hack Showcase API",
      "contributors": [
        "Nikhil Kansal",
        "Yvonne Chen",
        "Justin Liu"
      ]
    }
  ]
}
```

Note that the response is still an array, and you need to access `projects[0]`. Also, if there are no events with the specified ID, **the `success` field may still be `true`**. Make sure you check the length of `projects` before trying to access it.



#### `POST /api/v1/showcase`

Create a showcase project, provided you have the correct permission and the event data is not malformed.

The request body must follow the following schema:

```Javascript
{
  token: { type: String, required: true},
  project: {
    desc: { type: String },
    image: { type: String },
    link: { type: String, required: true },
    title: { type: String, required: true },
    contributors: { type: [String], required: true }
  }
}
```

Where `token` is a valid token, and the remaining fields contain the project information. You'll receive a response in the following format:

```json
{
  "success": true,
  "error": null,
  "project": {
    "id": "02261896-ce32-4fa5-906e-57650684c721",
    "date": "2016-12-22T05:57:51.155Z",
    "desc": "The next big messenger app",
    "image": "/some/image/url.png",
    "link": "http://bruinmessenger.herokuapp.com",
    "title": "Bruin Messenger",
    "contributors": [
      "Dmitri Brereton"
    ]
  }
}
```

If the request was successful, the `success` field will be set to `true` and you'll receive a copy of the newly-created project.



#### `PATCH /api/v1/showcase/:projectID`

Update an existing project, provided you have the correct permission, a valid event format, and an existing project ID. The schema for the request is the same as the `POST` request on this route, except the `id` field is ignored and you **only need to specify the fields that you wish to update**. In other words, this request **applies a delta to an existing project**. To specify which project to update, specify its ID as `:projectID` in the URL. For example, a request `PATCH /api/v1/project/02261896-ce32-4fa5-906e-57650684c721` (note that this is the newly-created project from the `POST` request above) with the following body:

```Json
{
  "token": "[Authorization token here",
  "project": {
    "contributors": ["Dmitri Brereton", "Ky-Coung Hyunh"]
  }
}
```

would be applied to the object shown in the `POST` request above. In repsonse, you might expect something in the form of:

```JSON
{
  "success": true,
  "error": null,
  "project": {
    "id": "02261896-ce32-4fa5-906e-57650684c721",
    "date": "2016-12-22T05:57:51.155Z",
    "desc": "The next big messenger app",
    "image": "/some/image/url.png",
    "link": "http://bruinmessenger.herokuapp.com",
    "title": "Bruin Messenger",
    "contributors": [
      "Dmitri Brereton",
      "Ky-Coung Hyunh"
    ]
  }
}
```

The returned `project` is a confirmation of the updated project object.



#### `DELETE /api/v1/showcase`

Deletes all showcase projects currently in the database. Requires a token in the body.

```json
{
  "token": "[Authorization token here"
}
```

You'll receive a response in the following format:

```JSON
{
  "success": true,
  "error": null,
  "removed": 4
}
```

Where `success` indicates whether or not the request was successful, and `removed` indicates how many records were removed.



#### `DELETE /api/v1/project/:projectID`

This request is identical to the previous `DELETE` request, except it specifies a project ID to delete through the URL (in place of `:projectID`), and only removes that project.
