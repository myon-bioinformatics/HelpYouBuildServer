# 🥳Help~　You~　Build~　Server~
*When beginners would like to build a server by any language, or use curl command, or understand them...*

## Summary
After Download, you can build a server by Go, Python, or...(others: now preparing).
You can practice using curl command, or understand how to build a server, 
or customize to your server whatever you ilke.

## About Server and Client
> __Note__  You can use with ease because you can build a server at localhost(127.0.0.1)🫶

> __Note__  Because localhost can be seen by only you and is not public🤠

**POST: A server will memorize, and response the message if you send correct request including the argments of 'text' and 'number'**

**GET: A server will memorize the requests, although a server won't response to Client**

## About Port
> __Note__  Actually, it's no relations, and it's no problem you change the number of port.

For beginners, it is used different port at any language, though.

- Go -> localhost:3010
- Python -> localhost:3020
- Others -> Now preparing☕️

### Golang, you begin learning it　　<- localhost:3010　　　
```
go run main.go 
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3010/admin
curl localhost:3010/admin
```

#### Standard Output Example in the side of Server
> Server is started at http://localhost:3010
>
> Accepted Control message about Text and Number: ニコニコ, Number: 2525. 
> 
> 127.0.0.1 - - [08/Jun/2023 04:31:33] "POST /admin HTTP/1.1" 200 - 
>
> 127.0.0.1 - - [08/Jun/2023 04:32:05] "GET / HTTP/1.1" 501 -


### Python, you begin learning it 　　<- localhost:3020
```
python main.py
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3020/admin
curl localhost:3020/admin
```

#### Standard Output Example in the side of Server
> Server is started at http://localhost:3020
>
> Accepted Control message about Text and Number: ニコニコ, Number: 2525. 
> 
> 127.0.0.1 - - [08/Jun/2023 04:31:33] "POST /admin HTTP/1.1" 200 - 
>
> 127.0.0.1 - - [08/Jun/2023 04:32:05] "GET / HTTP/1.1" 501 -
