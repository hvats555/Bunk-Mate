

# Bunk-Mate
Bunk-Mate is an attendance manager API especially for collage students to manage their attendance.

Live app link : 
https://bunk-mate.herokuapp.com/

## Table of contents

* Authentication
  * Register
  * Login
* Subjects
  * Display all the subjects
  * Add a new subject
  * Display single subject
  * Update subject
  * Delete a subject
* Marking attendance for a subject
  * Missed
  * Attended


## User Guide

### Register

Route: ```/register``` <br />
Method: ```POST``` <br />

Body: 
    
    {
      "name" : "name",
      "email" : "example@email.com",
      "password" : "test-password"
    }
    

###### Response : JWT Auth Token will be returned

### Login

Route: ```/login``` <br />
Method: ```POST``` <br />

Body: 
    
    {
      "email": "email@example.com",
      "password": "password"
    } 
    

###### Response : JWT Auth Token will be returned

### Subjects

Route: ``` /subjects ``` <br />
Method: ```GET``` <br />
Description: Displays all the subjects <br />


Header:

```
key: x-auth-token
value: JWT Auth Token
```

Response example

    [
        {
            "user": {
                "_id": "5eee335e48f2130017f391ae"
            },
            "attendance": {
                "attended": 0,
                "missed": 0,
                "total": 0,
                "percentage": 0
            },
            "_id": "5eee353d48f2130017f391b3",
            "title": "Maths",
            "__v": 0
        }
    ]
    
**Route:** ``` /subjects ``` <br />
**Method:** ```POST``` <br />
**Description:** Add new subject <br />


###### Body :

    {
      "title" : "Computer science"
    }

###### Header:

```
key: x-auth-token
value: JWT Auth Token
```

###### Response example

    {
      "attendance": {
          "attended": 0,
          "missed": 0,
          "total": 0,
          "percentage": 0
      },

      "_id": "60dab85be57f9b001763d5e8",
      "user": {
          "_id": "5eede10dea25550017deaba0"
      },
        "title": "Computer science",
        "__v": 0
    }
  
**Route:** ``` /subjects/{subject_id} ``` <br />
**Method:** ```PUT``` <br />
**Description:** Update the subject<br />


###### Body :

    {
      "title" : "Maths"
    }

###### Header:

```
key: x-auth-token
value: JWT Auth Token
```

###### Response example

    {
      "attendance": {
          "attended": 0,
          "missed": 0,
          "total": 0,
          "percentage": 0
      },

      "_id": "60dab85be57f9b001763d5e8",
      "user": {
          "_id": "5eede10dea25550017deaba0"
      },
        "title": "Maths",
        "__v": 0
    }
    
    
**Route:** ``` /subjects/{subject_id} ``` <br />
**Method:** ```GET``` <br />
**Description:** Get a single subject <br />


###### Header:

```
key: x-auth-token
value: JWT Auth Token
```

###### Response example

    {
      "attendance": {
          "attended": 0,
          "missed": 0,
          "total": 0,
          "percentage": 0
      },

      "_id": "60dab85be57f9b001763d5e8",
      "user": {
          "_id": "5eede10dea25550017deaba0"
      },
        "title": "Computer science",
        "__v": 0
    }
    
**Route:** ``` /subjects/{subject_id} ``` <br />
**Method:** ```DELETE``` <br />
**Description:** Delete a subject  <br />


###### Body :

    {
      "title" : "Computer science"
    }

###### Header:

```
key: x-auth-token
value: JWT Auth Token
```

###### Response example

    Deleted the subject
    {
    user: { _id: 5e8aab69fc6ac22bfc048cd3 },
    attendance: { attended: 6, missed: 83, total: 89, percentage: 0 },
    _id: 5eede1e5ea25550017deaba1,
    title: 'Subject',
    __v: 0
    }
    
## Marking the attendance

**Route:** ``` /attendance/{subject_id} ``` <br />
**Method:** ```PATCH``` <br />
**Description:** Mark the attendance  <br />

###### Body :
**Status** 
"missed": If class is missed <br />
"attended" : If class is attended <br />

    {
      "status" : "missed"
    }
    
     {
        user: { _id: 5e8aab69fc6ac22bfc048cd3 },
        attendance: { attended: 6, missed: 84, total: 90, percentage: 0 },
        _id: 5eede1e5ea25550017deaba1,
        title: 'Subject',
        __v: 0
    }



    
    
