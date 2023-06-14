require 'webrick'

class ControlMessage
  attr_accessor :text, :number

  def initialize(text, number)
    @text = text.force_encoding('UTF-8')
    @number = number
  end

  def [](key)
    send(key)
  end
end

# Process the control message
def process_message(message)
  puts "Accepted Control message, Text: #{message[:text]}, Number: #{message[:number]}"
end

# Start the server and listen for incoming requests
port = 3040
hostname = 'localhost'
puts "Server is started at http://#{hostname}:#{port}"

server = WEBrick::HTTPServer.new(Port: port)

server.mount_proc('/admin') do |req, res|
  if req.request_method == 'POST'
    text = req.query['text'].force_encoding('UTF-8')
    number = req.query['number'].to_i

    if text.nil? || number.zero?
      res.status = 400
      res.body = 'Bad Request'
    else
      message = ControlMessage.new(text, number)
      process_message(message)
      res.status = 200
      res.body = "OK, Accepted Control message, Text: #{text}, Number: #{number}"
    end
  else
    res.status = 200
    res.body = "OK: It's a GET method or url not in \"/admin\""
  end
end

trap('INT') { server.shutdown }
server.start
