# 🥳<Help~　You~　Build~　Server~
__*🚴‍♀️When Beginners would like to build a server by any language, or use curl command, or understand...🚴‍♂️*__

![GitHub license](https://img.shields.io/github/license/myon-bioinformatics/HelpYouBuildServer)
![GitHub last commit](https://img.shields.io/github/last-commit/myon-bioinformatics/HelpYouBuildServer)

[![GitHub followers](https://img.shields.io/github/followers/myon-bioinformatics?style=social)](https://github.com/myon-bioinformatics)
[![Reddit User Karma](https://img.shields.io/reddit/user-karma/combined/myon_reddit?style=social)](https://www.reddit.com/user/myon_reddit/)
[![Twitter Follow](https://img.shields.io/twitter/follow/myonitbusiness?style=social)](https://twitter.com/myonitbusiness)

## 🦊Summary🦊
After Download, you can build a server by Go, Python, JavaScript(*Deno*), Ruby, Node.js, Bun, PHP, Elixir, or Rust — all with a single one-liner command!

You can practice using curl command, understand how to build a server,
or customize to your liking.

## 🐼About Server and Client🐼
> __Note__ You can use with ease because you can build a server at localhost(127.0.0.1)🫶
>
> __Note__ Because localhost can be seen by only you, and it is not public🤠

**POST: A server will acknowledge, and response the message if you send correct request including the arguments of 'text' and 'number'**

**GET: A server will acknowledge the request, although a server won't response to Client**

## 🐸About Port, and Practice🐸
> __Note__ Actually, it's no relations, and it's no problem you change the number of port.
>
> __Note__ Wiki is updated occasionally for Beginners.

For Beginners, it is used different port at any language, though.

- [x] Go -> localhost:3010
- [x] Python -> localhost:3020
- [x] JavaScript(*Deno*) -> localhost:3030
- [x] Ruby -> localhost:3040
- [x] Node.js -> localhost:3050
- [x] Bun -> localhost:3060
- [x] PHP -> localhost:3070
- [x] Elixir -> localhost:3080
- [x] Rust -> localhost:3090

---

### 1) Golang　　← localhost:3010
#### ⓪Confirm Version
> *go version go1.22.0 darwin/arm64* when I confirmed by using ```go version```

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
go run main.go
```

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3010/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3010
>
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> Sent Control message about Text: ニコニコ, Number: 2525


### 2) Python　　← localhost:3020
#### ⓪Confirm Version
> *Python 3.12.0* when I confirmed by using ```python --version```
>
> __Note__ startswith() can be used since Python 3.9

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
python main.py
```

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3020/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3020
>
> Accepted Control message: Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message: Text: ニコニコ, Number: 2525

### 3) JavaScript(*Deno*)　　← localhost:3030

> Updated to use `Deno.serve()` — the recommended API since Deno v1.35 / v2.x (no import needed).

#### ⓪Confirm Version
> *deno 2.0.0, v8 13.x, typescript 5.x* when I confirmed by using ```deno --version```

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
deno run --allow-net main.ts
```

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3030/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3030
>
> Listening on http://localhost:3030/
>
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525


### 4) Ruby　　← localhost:3040
#### ⓪Confirm Version

> *ruby 3.3.0 (2023-12-25) [arm64-darwin23]* when I confirmed by using ```ruby -v```
>
> __Note__ you must run ```gem install webrick``` if you haven't installed it

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
ruby main.rb
```

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3040/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3040
>
> [2024-01-01 12:00:00] INFO  WEBrick 1.8.1
>
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525


### 5) Node.js　　← localhost:3050
#### ⓪Confirm Version
> *v22.0.0* when I confirmed by using ```node --version```
>
> __Note__ Uses only the built-in `node:http` module — no npm install needed

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
node main.mjs
```

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3050/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3050
>
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525


### 6) Bun　　← localhost:3060
#### ⓪Confirm Version
> *1.1.0* when I confirmed by using ```bun --version```
>
> __Note__ Uses Bun's built-in `Bun.serve()` — no package install needed

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
bun main.bun.ts
```

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3060/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3060
>
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525


### 7) PHP　　← localhost:3070
#### ⓪Confirm Version
> *PHP 8.3.0* when I confirmed by using ```php --version```
>
> __Note__ Uses PHP's built-in web server — no framework or composer needed

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
php -S localhost:3070 main.php
```

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3070/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3070
>
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525


### 8) Elixir　　← localhost:3080
#### ⓪Confirm Version
> *Elixir 1.16.0 (compiled with Erlang/OTP 26)* when I confirmed by using ```elixir --version```
>
> __Note__ Uses `:gen_tcp` from Erlang/OTP standard library — no mix project needed

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
elixir main.exs
```

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3080/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3080
>
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525


### 9) Rust　　← localhost:3090
#### ⓪Confirm Version
> *rustc 1.78.0* when I confirmed by using ```rustc --version```
>
> __Note__ Uses only the Rust standard library (`std::net`) — no external crates needed

#### ①Command Example (One-liner🎉)

##### 🎂A Terminal in the side of Server
```
cargo run
```
> Run this command inside the `rust/` directory.

##### 🎸Another Terminal in the side of Client
```
curl -X POST -d 'text=ニコニコ' -d 'number=2525' localhost:3090/admin
```

#### ②Standard Output Example in the side of Server🎂
> Server is started at http://localhost:3090
>
> Accepted Control message, Text: ニコニコ, Number: 2525

#### ③Standard Output Example in the side of Client🎸
> OK, Accepted Control message, Text: ニコニコ, Number: 2525

