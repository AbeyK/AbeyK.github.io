function force_lowercase_urls() {

	url = window.location.href;
	url = url.toLowerCase();

	BASE_URL = "www.abeyk.com";
	pre_url = ["http://", "https://"];
	valid_pages = ["","/brevity", "/airbae", "/sentiment", "/r"];

	valid_urls = new Set([]);

	for(var page = 0; page<valid_pages.length; page++){
		for (var pre = 0; pre<pre_url.length; pre++){
			valid_page = pre_url[pre]+BASE_URL+valid_pages[page];
			valid_urls.add(valid_page);
			valid_page += "/";
			valid_urls.add(valid_page);
		}
	}

	console.log(valid_urls)

	if (valid_urls.has(url)){
		window.location.replace(url);
	} else{
		window.location.replace("https://www.abeyk.com/");
	}
}

force_lowercase_urls();