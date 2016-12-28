**Events**
----
  The events API provides an easy way to get, create, update, and delete events. Each response is a JSON object with two top-level fields that indicate the status of the request: `success` and `error`. If `success` === `false`, then the `error` field will describe the errors encountered in the request. 

  **`GET` /api/v1/event**
  
*  **URL Params**

   **Optional:**
 
   `:eventID` - the ID of a specific event.

* **Success Response:**
  
  When no event ID is provided, all events are returned. When an event ID is provided, all events matching the ID are returned. The response format is a JSON object in the following format: 
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
 
* **Error Response:**

  In the JSON object response, two top-leven fields indicate the status of the request: `success` and `error`. If `success` === `false`, then the `error` field will describe the errors encountered in the request. 

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
