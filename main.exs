# Simple HTTP server in Elixir using :gen_tcp (no external dependencies).
# Start with: elixir main.exs

defmodule ControlMessage do
  defstruct [:text, :number]
end

defmodule Server do
  @port 3080
  @backlog 10

  def parse_form(body) do
    body
    |> String.split("&")
    |> Enum.reduce(%{}, fn pair, acc ->
      case String.split(pair, "=", parts: 2) do
        [k, v] -> Map.put(acc, URI.decode_www_form(k), URI.decode_www_form(v))
        _ -> acc
      end
    end)
  end

  def process_message(%ControlMessage{text: text, number: number}) do
    IO.puts("Accepted Control message, Text: #{text}, Number: #{number}")
  end

  def send_response(socket, status, body) do
    reason = if status == 200, do: "OK", else: "Bad Request"
    response = "HTTP/1.1 #{status} #{reason}\r\nContent-Type: text/plain\r\nContent-Length: #{byte_size(body)}\r\nConnection: close\r\n\r\n#{body}"
    :gen_tcp.send(socket, response)
    :gen_tcp.close(socket)
  end

  def handle_request(socket, request) do
    lines = String.split(request, "\r\n")
    [request_line | headers_and_body] = lines
    [method, path | _] = String.split(request_line, " ")

    body =
      case Enum.find_index(headers_and_body, &(&1 == "")) do
        nil -> ""
        idx -> Enum.drop(headers_and_body, idx + 1) |> Enum.join("\r\n")
      end

    if path == "/admin" and method == "POST" do
      params = parse_form(body)
      text = Map.get(params, "text")
      number_str = Map.get(params, "number")

      case {text, Integer.parse(number_str || "")} do
        {nil, _} ->
          send_response(socket, 400, "Bad Request")

        {_, :error} ->
          send_response(socket, 400, "Bad Request")

        {t, {n, ""}} ->
          msg = %ControlMessage{text: t, number: n}
          process_message(msg)
          send_response(socket, 200, "OK, Accepted Control message, Text: #{t}, Number: #{n}")

        _ ->
          send_response(socket, 400, "Bad Request")
      end
    else
      send_response(socket, 200, ~s(OK: It's a GET method or url not in "/admin"))
    end
  end

  def accept_loop(listen_socket) do
    {:ok, socket} = :gen_tcp.accept(listen_socket)
    spawn(fn ->
      {:ok, data} = :gen_tcp.recv(socket, 0)
      handle_request(socket, to_string(data))
    end)
    accept_loop(listen_socket)
  end

  def start do
    {:ok, listen_socket} =
      :gen_tcp.listen(@port, [:binary, packet: :raw, active: false, reuseaddr: true, backlog: @backlog])

    IO.puts("Server is started at http://localhost:#{@port}")
    accept_loop(listen_socket)
  end
end

Server.start()
