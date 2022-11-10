Steps to run 

Create a public and private key using the following commands

openssl genrsa -out private_key.pem 4096
openssl rsa -pubout -in private_key.pem -out public_key.pem


Dependency

requires yarn 
requires ts-node to be installed globally -> yarn global add ts-node
requires typescript -> yarn global add typescript
requires sqlite3

Go to the server directory 
Use command "yarn" to install dependencies
Run the server with "yarn start"  

On a different terminal, go to the client directory and run the command "yarn start". this will create 10 clients and send a request from each client every 1 second for a minute.


APIs

GET http://localhost:3000/blocks/count

RESPONSE 
{"totalCount":12}

GET http://localhost:3000/blocks/1

RESPONSE 
{"id":1,"hash":"0xfcc660b754266ade7a74fd9f7628d4fdedb95a88c9e4f824964e40d626907706","signedHash":"l3mr6Enla+CqO4XwRHTu5YYGD1yeoV74C4BMohTYtcAe0Wpev63KO4IqDtZBSxxNdUoPmO6Cok2mNa9hYmo5r7pGqBz2fdO8KqAXwLhuMf6p1jPg9Dy5siioi1YLM7/C94XvilDZvevLOSAFp8JvnduphcaLXjSEktPnDWd4Q2tHI6IHl256wsa7J838ol5FyYdJFAwTgPvfE8+CJdhXZVPIVbKSbI16NsATcchFxBIlGOijFO03alLY/jBCDKw6IZqZ+CpjwSiKHFtM/Tj8U0IbFTpkkTcmaR0pGlSHw7kb7Ec/CWsUCJA+Sni4VP4eODGW+XXdkjiXCtVDiwFXapMMCOhC1jYQbEhqTmcZPZP1BCoVi9PRCG40v2dmDip852wUs5Sh2u/HxDOJ266QGG4G8K49PA5dI6uxsk5qZkYasQGSVxTyOGhVYdV04IzAPYB85d2svXOkRY/ErppDiGV65yycx7/ZziZZyNv95zxa5wFr9U+TUb4bQxmjgNMu7Q6ZxzQ75fm7G5AbrfZM3IRYSDmwUx88Iic2GBpVtg+2ncruDefqGhdW8Hz5XcKvsVAoo4r7MKe6L9Pjf63Bg7/5wwtK1OyAHMLUSLFWvvpN48Wx9AZmxqCvKIa6uk4xYYDcNVV/eOsmhaibdB4MHiVrmEkJEKvXfw62ySvTMQc=","entries":"[{\"id\":1,\"fromAddress\":\"0x13DFD1A9859b539bFBFf18b6a28c83693c6B9e9e\",\"data\":\"{\\\"message\\\":\\\"3rbas\\\",\\\"publicKey\\\":\\\"0x13DFD1A9859b539bFBFf18b6a28c83693c6B9e9e\\\"}\",\"hash\":\"0x87662643006346f1f7a35a9e434f37fb0ad6138139ac82eaeb09df2df5d4e936\",\"nonce\":1,\"createdAt\":\"2022-11-09 17:59:26\"},{\"id\":2,\"fromAddress\":\"0xE62868F161D3Ec716412Ff3DFcC45E1594E05679\",\"data\":\"{\\\"message\\\":\\\"ex1265\\\",\\\"publicKey\\\":\\\"0xE62868F161D3Ec716412Ff3DFcC45E1594E05679\\\"}\",\"hash\":\"0x0da0390dcc5a38c4191b6d9d6c76f05fef272746f6e781f34c7eadbe43db7bf7\",\"nonce\":1,\"createdAt\":\"2022-11-09 17:59:26\"},{\"id\":3,\"fromAddress\":\"0x8f97dc5c3b1ba383E86c3D0451C110e87ee11629\",\"data\":\"{\\\"message\\\":\\\"4g9zsp\\\",\\\"publicKey\\\":\\\"0x8f97dc5c3b1ba383E86c3D0451C110e87ee11629\\\"}\",\"hash\":\"0x1f103f7c497fea65b97079501d3a36caf53ffa713a3246a58b6c30720c5ad6c8\",\"nonce\":1,\"createdAt\":\"2022-11-09 17:59:26\"}]","previousHash":null,"createdAt":"2022-11-09 17:59:35"}

GET http://localhost:3000/blocks/latest
RESPONSE gives details of the latest block

GET http://localhost:3000/blocks/previous/0x4c4df97d4de43e477387f6b6298bd2c4c70d485014506972ed57d4aaaafbb0e0
RESPONSE get data for the previous block


To run test cases

go to the server folder and run jest
