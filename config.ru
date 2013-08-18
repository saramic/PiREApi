use Rack::Static, 
  :urls => ["/js", "/css"],
  :root => "public"

map "/" do
  run lambda { |env|
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=300'
      },
      File.open('public/index.html', File::RDONLY)
    ]
  }
end

map "/listing.html" do
  run lambda { |env|
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=300'
      },
      File.open('public/listing.html', File::RDONLY)
    ]
  }
end

map "/key.json" do
  run lambda { |env|
    [
      200,
      {
        'Content-Type'  => 'application/json',
        'Cache-Control' => 'public, max-age=300'
      },
      "{\"reaApiKey\":\"#{ENV['REA_API_KEY']}\"}"
    ]
  }
end
