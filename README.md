# JSON formart Proto

## Example

```js
let object = {
  "Id": "63c6170dd161863299c4e7ff",
  "ctime": "2023-01-17T03:33:33.903Z",
  "deleted": false,
  "title": "hello world",
  "categories": [
    "app"
  ],
  "url": "",
  "total": 1900
}

let jsonSource = JSON.stringify(object);
let protoMessage = convertJSONToProto(jsonSource);

console.log('protoMessage: ', protoMessage);

// out
message Message {
  string Id = 1;
  google.protobuf.Timestamp ctime = 2;
  bool deleted = 3;
  string title = 4;
  repeated string categories = 5;
  string url = 6;
  int32 total = 7;
}

```
