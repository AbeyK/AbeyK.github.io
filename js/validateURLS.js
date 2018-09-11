function force_lowercase_urls() {

	url = window.location.href;
	url = url.toLowerCase();

	// BASE_URL = "www.abeyk.com";
	// pre_url = ["http://", "https://"];
	// valid_pages = ["","/brevity", "/airbae", "/sentiment", "/r"];

	// valid_urls = new Set([]);

	// for(var page = 0; page<valid_pages.length; page++){
	// 	for (var pre = 0; pre<pre_url.length; pre++){
	// 		valid_page = pre_url[pre]+BASE_URL+valid_pages[page];
	// 		valid_urls.add(valid_page);
	// 		valid_page += "/";
	// 		valid_urls.add(valid_page);

	// 	}
	// }

	// valid_urls_string = ""

	// for(var thing of valid_urls){
	// 	valid_urls_string += "\""+thing+"\""+","
	// }

	// console.log(valid_urls_string);


	valid_urls = new Set(["http://www.abeyk.com","http://www.abeyk.com/","https://www.abeyk.com","https://www.abeyk.com/","http://www.abeyk.com/brevity","http://www.abeyk.com/brevity/","https://www.abeyk.com/brevity","https://www.abeyk.com/brevity/","http://www.abeyk.com/airbae","http://www.abeyk.com/airbae/","https://www.abeyk.com/airbae","https://www.abeyk.com/airbae/","http://www.abeyk.com/sentiment","http://www.abeyk.com/sentiment/","https://www.abeyk.com/sentiment","https://www.abeyk.com/sentiment/","http://www.abeyk.com/r","http://www.abeyk.com/r/","https://www.abeyk.com/r","https://www.abeyk.com/r/"])
	if (valid_urls.has(url)){
		window.location.replace(url);
	} else{
		window.location.replace("https://www.abeyk.com/");
	}
}

force_lowercase_urls();