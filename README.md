# apollo-gateway-poc
Apollo GraphQL Gateway in Node.js

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://apollo-gateway-poc.herokuapp.com/' \
  --data '{"query": "query($first: Int) { me {id} topProducts(first: $first) {id, name}}"}'
```
