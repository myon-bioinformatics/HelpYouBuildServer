# 🥳<Help~　You~　Build~　Server~
__*🚴‍♀️When beginners would like to build a server by any language, or use curl command, or understand them...🚴‍♂️*__

## 🦊Summary🦊
After Download, you can build a server by Go, Python, JavaScript(*Deno*), Ruby, or...(others: now preparing).
You can practice using curl command, or understand how to build a server, 
or customize to your server whatever you like.

## 🐼About Server and Client🐼
> __Note__  You can use with ease because you can build a server at localhost(127.0.0.1)🫶

> __Note__  Because localhost can be seen by only you, and it is not public🤠

- **POST: A server will acknowledge, and response the message if you send correct request including the argments of 'text' and 'number'**

- **GET: A server will acknowledge the request, although a server won't response to Client**

## 🐸About Port and how to use🐸
> __Note__  Actually, it's no relations, and it's no problem you change the number of port.
> 
> __Note__ 　　Wiki is updated occasionally for Beginners.

For Beginners, it is used different port at any language, though.

- [x] Go -> localhost:3010
- [x] Python -> localhost:3020
- [x] JavaScript(*Deno*) -> localhost:3030
- [x] Ruby  -> localhost:3040
- [ ] Others -> Now preparing☕️

### 1) Golang, when you begin learning it　　<- localhost:3010　　　
#### ⓪Confirm Version
> go version go1.20.4 darwin/arm64 when I confirmed by using ```go version```

#### ①Command Example

##### A Terminal in the side of Server
```
go run main.go 
```

##### Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3010/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3010
> 
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> Sent Control message about Text and Numebr: ニコニコ, Number: 2525


### 2) Python, when you begin learning it 　　<- localhost:3020
#### ⓪Confirm Version
> Python 3.11.3 when I confirmed by using ```python --version```
> 
> __Note__ startswith() can be used since Python 3.9

#### ①Command Example

##### A Terminal in the side of Server
```
python main.py
```

##### Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3020/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3020
>
> 127.0.0.1 - - [14/Jun/2023 20:52:09] "POST /admin HTTP/1.1" 200 -
> 
> Accepted Control message: Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message: Text: ニコニコ, Number: 2525

### 3) JavaScript(*Deno*), when you begin learning it　　<- localhost:3030　　　

> Reference: *https://deno.land/std@0.191.0/http/server.ts?s=serve* 

#### ⓪Confirm Version
> v8 11.5.150.2, typescript 5.0.4 when I confirmed by using ```deno --version```

#### ①Command Example

##### A Terminal in the side of Server
```
deno run main.ts
```

##### Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3030/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3030
> 
> ✅ Granted all net access.
> 
> Listening on http://localhost:3030/
> 
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525


### 4) Ruby, when you begin learning it　　<- localhost:3040　　　
#### ⓪Confirm Version

> ruby 3.2.2 (2023-03-30 revision e51014f9c0) [arm64-darwin22] when I confirmed by using ```ruby -v```
> 
>__Note__ you must comand```gem install webrick``` if you don't install it

#### ①Command Example

##### A Terminal in the side of Server
```
ruby main.rb
```

##### Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3040/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3040
>
> [2023-06-14 20:32:56] INFO  WEBrick 1.8.1
>
> [2023-06-14 20:32:56] INFO  ruby 3.2.2 (2023-03-30) [arm64-darwin22]
>
> [2023-06-14 20:32:56] INFO  WEBrick::HTTPServer#start: pid=41089 port=3040
>
> Accepted Control message, Text: ニコニコ, Number: 2525
>
> 127.0.0.1 - - [14/Jun/2023:20:32:59 JST] "POST /admin HTTP/1.1" 200 62

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525

